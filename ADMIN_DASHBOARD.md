# 🛠️ Admin Dashboard Documentation

## Overview

The Admin Dashboard provides comprehensive management tools for the Lance invoice scanning system. It's designed for administrators to monitor, control, and troubleshoot the hybrid scanning architecture.

## 🔐 Access Control

- **Admin-only access**: Only users with `is_admin=true` can access the dashboard
- **Automatic detection**: The system checks admin privileges on page load
- **Secure endpoints**: All admin API calls require admin authentication

## 📊 Dashboard Sections

### 1. Overview Tab

**Key Metrics:**
- Total users and Gmail connection status
- Scheduler running status and active jobs
- Webhook health and activity levels
- Recent parsing error count

**Quick Actions:**
- Start/Stop scheduler
- Trigger scan for all users
- Register Gmail watches for all users
- Search and debug specific users

### 2. Scheduler Tab

**Scheduler Control:**
- View current scheduler status (Running/Stopped)
- Start or stop the periodic scanning system
- Monitor active jobs and their next run times

**Job Details:**
- Invoice scanning (every 2 hours)
- Payment confirmation scanning (every 6 hours)
- Daily overdue reports (9 AM daily)

### 3. Webhooks Tab

**Webhook Status:**
- Total users vs users with Gmail connected
- Users with active webhook subscriptions
- Health status (Healthy/Warning/Error)
- Recent activity metrics

**Management:**
- Register Gmail watches for users without webhooks
- Monitor webhook activity levels

### 4. Users Tab

**User Management:**
- List all users with scanning activity
- View last scan timestamps
- Check Gmail connection status
- Monitor webhook subscription status
- Trigger individual user scans

### 5. Error Logs Tab

**Parsing Errors:**
- View recent invoice parsing failures
- Filter by user ID and error type
- See error details and timestamps
- Debug parsing issues

### 6. Scan Logs Tab

**Activity Monitoring:**
- Recent scanning activity
- Scan types (manual/automatic)
- User-specific scan history
- Timestamp tracking

## 🚀 Key Features

### Hybrid Architecture Management

The dashboard manages both scanning methods:

1. **Primary: Gmail Webhooks** (Real-time)
   - Monitor webhook health
   - Register watches for users
   - Track webhook activity

2. **Fallback: Periodic Cron Jobs** (Every 2-6 hours)
   - Control scheduler status
   - Monitor job schedules
   - Trigger manual scans

### User Debugging

- **Search by email**: Find specific users quickly
- **Debug information**: View user stats and recent errors
- **Manual triggers**: Force scans for troubleshooting
- **Connection status**: Check Gmail and webhook setup

### System Monitoring

- **Real-time status**: Live updates of system health
- **Error tracking**: Monitor parsing failures
- **Activity logs**: Track scanning operations
- **Performance metrics**: Monitor system usage

## 🔧 API Endpoints

### Scheduler Management
- `GET /admin/scheduler/status` - Get scheduler status
- `POST /admin/scheduler/start` - Start scheduler
- `POST /admin/scheduler/stop` - Stop scheduler
- `POST /admin/scheduler/scan-all` - Scan all users
- `POST /admin/scheduler/scan-user/{user_id}` - Scan specific user

### Webhook Management
- `GET /admin/webhook-status` - Get webhook health
- `POST /admin/gmail/register-watches-all` - Register watches

### User Management
- `GET /admin/users/search` - Search users
- `GET /admin/users/{user_id}/debug` - Get user debug info

### Monitoring
- `GET /admin/parsing-errors/` - Get parsing errors
- `GET /admin/scan-logs` - Get scan activity logs

## 🎯 Use Cases

### Daily Operations
1. **Morning check**: Review system health and recent activity
2. **Error monitoring**: Check for parsing failures
3. **User support**: Debug specific user issues
4. **System maintenance**: Manage scheduler and webhooks

### Troubleshooting
1. **User not receiving updates**: Check Gmail connection and webhook status
2. **Parsing errors**: Review error logs and debug specific cases
3. **System performance**: Monitor scan activity and job schedules
4. **Webhook issues**: Register watches and check health status

### Scaling
1. **User growth**: Monitor system load and performance
2. **API quotas**: Track Gmail API usage
3. **Error rates**: Monitor parsing success rates
4. **System reliability**: Ensure hybrid scanning works correctly

## 🔒 Security Considerations

- **Admin-only access**: All endpoints require admin privileges
- **JWT authentication**: Secure token-based authentication
- **Audit logging**: All admin actions are logged
- **Error handling**: Secure error responses without sensitive data

## 📈 Future Enhancements

### Planned Features
- **Real-time notifications**: WebSocket updates for live monitoring
- **Advanced filtering**: More sophisticated search and filter options
- **Export capabilities**: Download reports and logs
- **User management**: Direct user account management
- **System metrics**: Performance and usage analytics

### Potential Additions
- **Email notifications**: Alert admins of critical issues
- **Automated actions**: Auto-fix common problems
- **Custom schedules**: User-configurable scan frequencies
- **Advanced debugging**: More detailed error analysis tools

## 🚨 Troubleshooting

### Common Issues

1. **Dashboard not loading**
   - Check admin privileges
   - Verify authentication token
   - Check API connectivity

2. **Scheduler not responding**
   - Verify Redis connection
   - Check APScheduler logs
   - Restart the application

3. **Webhook registration failing**
   - Check Google Pub/Sub configuration
   - Verify topic permissions
   - Check user Gmail tokens

4. **User scans not working**
   - Check Gmail API quotas
   - Verify user permissions
   - Review error logs

### Debug Steps

1. **Check system status**: Use the Overview tab
2. **Review error logs**: Check the Error Logs tab
3. **Test user connections**: Use the Users tab
4. **Monitor activity**: Check the Scan Logs tab
5. **Verify webhooks**: Use the Webhooks tab

## 📞 Support

For issues with the admin dashboard:

1. Check the error logs in the dashboard
2. Review system status and health metrics
3. Test individual components (scheduler, webhooks, users)
4. Check application logs for detailed error information
5. Verify configuration and environment variables 