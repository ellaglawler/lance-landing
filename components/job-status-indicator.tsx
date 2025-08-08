import React, { useEffect, useState } from 'react';
import { Clock, Loader2, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { JobStatusResponse, pollJobStatus } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

interface JobStatusIndicatorProps {
  jobId: string;
  title?: string;
  onComplete?: (result: JobStatusResponse) => void;
  onError?: (error: string) => void;
  autoPoll?: boolean;
  className?: string;
}

export function JobStatusIndicator({
  jobId,
  title = "Background Job",
  onComplete,
  onError,
  autoPoll = true,
  className
}: JobStatusIndicatorProps) {
  const [status, setStatus] = useState<JobStatusResponse | null>(null);
  const [isPolling, setIsPolling] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (jobId && autoPoll) {
      setIsPolling(true);
      pollJobStatus(jobId, setStatus)
        .then((finalStatus) => {
          setIsPolling(false);
          onComplete?.(finalStatus);
          
          if (finalStatus.status === 'finished') {
            toast({
              title: "Job Completed",
              description: finalStatus.result || "Operation completed successfully",
            });
          } else if (finalStatus.status === 'failed' || finalStatus.status === 'error') {
            toast({
              title: "Job Failed",
              description: finalStatus.result || "Operation failed",
              variant: "destructive",
            });
            onError?.(finalStatus.result || "Job failed");
          }
        })
        .catch((error) => {
          setIsPolling(false);
          onError?.(error.message);
          toast({
            title: "Error",
            description: "Failed to check job status",
            variant: "destructive",
          });
        });
    }
  }, [jobId, autoPoll, onComplete, onError, toast]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'queued':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'started':
        return <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />;
      case 'finished':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'failed':
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'queued':
        return <Badge variant="secondary">Queued</Badge>;
      case 'started':
        return <Badge variant="default">Running</Badge>;
      case 'finished':
        return <Badge variant="default" className="bg-green-500">Completed</Badge>;
      case 'failed':
      case 'error':
        return <Badge variant="destructive">Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  if (!status) {
    return (
      <Card className={className}>
        <CardContent className="flex items-center justify-center p-6">
          <Loader2 className="w-4 h-4 animate-spin mr-2" />
          <span>Initializing job status...</span>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {getStatusIcon(status.status)}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {getStatusBadge(status.status)}
            <span className="text-sm text-muted-foreground">
              {status.status === 'queued' && 'Job is waiting to be processed'}
              {status.status === 'started' && 'Job is currently running'}
              {status.status === 'finished' && 'Job completed successfully'}
              {status.status === 'failed' && 'Job failed to complete'}
              {status.status === 'error' && 'Job encountered an error'}
            </span>
          </div>
          {isPolling && (
            <RefreshCw className="w-4 h-4 animate-spin text-blue-500" />
          )}
        </div>

        {status.result && (
          <div className="text-sm text-muted-foreground">
            {status.result}
          </div>
        )}

        {/* Job Timestamps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          {status.enqueued_at && (
            <div>
              <span className="font-medium">Queued:</span>
              <br />
              <span className="text-muted-foreground">
                {new Date(status.enqueued_at).toLocaleString()}
              </span>
            </div>
          )}
          {status.started_at && (
            <div>
              <span className="font-medium">Started:</span>
              <br />
              <span className="text-muted-foreground">
                {new Date(status.started_at).toLocaleString()}
              </span>
            </div>
          )}
          {status.ended_at && (
            <div>
              <span className="font-medium">Completed:</span>
              <br />
              <span className="text-muted-foreground">
                {new Date(status.ended_at).toLocaleString()}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
