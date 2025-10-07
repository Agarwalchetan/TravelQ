import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, Users, FileText, DollarSign, Flag, TrendingUp, 
  MapPin, Calendar, Clock, Eye, Heart, MessageCircle, 
  Search, Filter, MoreHorizontal, Edit, Trash2, CheckCircle,
  XCircle, AlertTriangle, Settings, Bell, Download,
  Globe, Zap, Crown, Shield, Activity, RefreshCw
} from 'lucide-react';
import { Container } from '../components/ui/Container';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

// Mock data for demonstration
const dashboardStats = {
  tripsToday: 1245,
  activeUsers: 327,
  blogsThisWeek: 112,
  revenueToday: 82000,
  flaggedReports: 6,
  growthRate: 12.5,
  conversionRate: 3.2,
  avgSessionTime: '4m 32s'
};

const recentUsers = [
  {
    id: 1,
    name: 'Rhea Kapoor',
    email: 'rhea@example.com',
    role: 'User',
    status: 'active',
    trips: 12,
    blogs: 4,
    joined: 'Jan 12, 2025',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastActive: '2 hours ago'
  },
  {
    id: 2,
    name: 'Arjun Mehta',
    email: 'arjun@example.com',
    role: 'Creator',
    status: 'active',
    trips: 8,
    blogs: 15,
    joined: 'Dec 28, 2024',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastActive: '1 hour ago'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'User',
    status: 'suspended',
    trips: 3,
    blogs: 1,
    joined: 'Jan 15, 2025',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150',
    lastActive: '1 day ago'
  }
];

const recentTrips = [
  {
    id: 1,
    title: 'Goa Beach Paradise',
    destination: 'Goa',
    days: 5,
    visibility: 'public',
    creator: 'Rhea Kapoor',
    likes: 234,
    copies: 45,
    status: 'approved',
    createdAt: '2 hours ago'
  },
  {
    id: 2,
    title: 'Manali Adventure Trek',
    destination: 'Manali',
    days: 7,
    visibility: 'public',
    creator: 'Arjun Mehta',
    likes: 189,
    copies: 32,
    status: 'flagged',
    createdAt: '4 hours ago'
  },
  {
    id: 3,
    title: 'Kerala Backwater Cruise',
    destination: 'Kerala',
    days: 4,
    visibility: 'private',
    creator: 'Priya Sharma',
    likes: 67,
    copies: 12,
    status: 'approved',
    createdAt: '6 hours ago'
  }
];

const recentBlogs = [
  {
    id: 1,
    title: 'Backpacking Manali in 5K',
    author: 'Ankit R.',
    status: 'published',
    likes: 231,
    comments: 22,
    flagged: 1,
    publishedAt: '1 day ago',
    category: 'Budget Travel'
  },
  {
    id: 2,
    title: 'Solo Female Travel in Rajasthan',
    author: 'Sneha P.',
    status: 'draft',
    likes: 0,
    comments: 0,
    flagged: 0,
    publishedAt: null,
    category: 'Solo Travel'
  },
  {
    id: 3,
    title: 'Luxury Resorts in Goa',
    author: 'Vikram S.',
    status: 'published',
    likes: 156,
    comments: 34,
    flagged: 0,
    publishedAt: '3 days ago',
    category: 'Luxury Travel'
  }
];

const flaggedReports = [
  {
    id: 1,
    type: 'Trip',
    reportedOn: 'Goa 2025 by @xyz',
    reason: 'Offensive content',
    reporter: '@abc',
    status: 'pending',
    reportedAt: '2 hours ago'
  },
  {
    id: 2,
    type: 'Blog',
    reportedOn: 'Budget Travel Tips',
    reason: 'Spam content',
    reporter: '@def',
    status: 'reviewing',
    reportedAt: '4 hours ago'
  },
  {
    id: 3,
    type: 'Comment',
    reportedOn: 'User comment on trip',
    reason: 'Harassment',
    reporter: '@ghi',
    status: 'resolved',
    reportedAt: '1 day ago'
  }
];

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTimeRange, setSelectedTimeRange] = useState('today');
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New user registration spike detected', type: 'info', time: '5 min ago' },
    { id: 2, message: 'Server response time improved', type: 'success', time: '10 min ago' },
    { id: 3, message: 'Content flagged for review', type: 'warning', time: '15 min ago' }
  ]);

  useEffect(() => {
    document.title = 'Admin Portal - Control the Journey | Wanderlust';
  }, []);

  const StatCard = ({ title, value, change, icon: Icon, color, trend }: any) => (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="relative overflow-hidden">
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${color} opacity-10 rounded-bl-full`}></div>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-text-secondary dark:text-dark-text-secondary text-sm font-medium">{title}</p>
              <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">{value}</p>
              {change && (
                <div className={`flex items-center gap-1 mt-1 ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                  <TrendingUp className={`h-3 w-3 ${trend === 'down' ? 'rotate-180' : ''}`} />
                  <span className="text-xs font-medium">{change}%</span>
                </div>
              )}
            </div>
            <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center`}>
              <Icon className="h-6 w-6 text-white" />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  const renderDashboard = () => (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Trips Created Today"
          value={dashboardStats.tripsToday.toLocaleString()}
          change={dashboardStats.growthRate}
          trend="up"
          icon={MapPin}
          color="from-blue-500 to-cyan-500"
        />
        <StatCard
          title="Active Users Now"
          value={dashboardStats.activeUsers}
          change={8.2}
          trend="up"
          icon={Users}
          color="from-green-500 to-emerald-500"
        />
        <StatCard
          title="Blogs This Week"
          value={dashboardStats.blogsThisWeek}
          change={15.3}
          trend="up"
          icon={FileText}
          color="from-purple-500 to-pink-500"
        />
        <StatCard
          title="Revenue Today"
          value={`₹${dashboardStats.revenueToday.toLocaleString()}`}
          change={dashboardStats.conversionRate}
          trend="up"
          icon={DollarSign}
          color="from-orange-500 to-red-500"
        />
      </div>

      {/* Quick Actions & Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Flagged Reports */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Flagged Reports</CardTitle>
            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
              {dashboardStats.flaggedReports} New
            </Badge>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {flaggedReports.slice(0, 3).map((report) => (
                <div key={report.id} className="flex items-center justify-between p-3 bg-surface dark:bg-dark-surface rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Badge variant="secondary" className="text-xs">{report.type}</Badge>
                      <span className="text-sm font-medium text-text-primary dark:text-dark-text-primary">
                        {report.reason}
                      </span>
                    </div>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      {report.reportedOn} • {report.reportedAt}
                    </p>
                  </div>
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                </div>
              ))}
            </div>
            <Button variant="outline" fullWidth className="mt-4">
              View All Reports
            </Button>
          </CardContent>
        </Card>

        {/* Live Activity Feed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Live Activity</CardTitle>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-text-secondary dark:text-dark-text-secondary">Live</span>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 bg-surface dark:bg-dark-surface rounded-lg">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    notification.type === 'success' ? 'bg-green-500' :
                    notification.type === 'warning' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="text-sm text-text-primary dark:text-dark-text-primary">
                      {notification.message}
                    </p>
                    <p className="text-xs text-text-secondary dark:text-dark-text-secondary">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" fullWidth className="mt-4">
              View All Activity
            </Button>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-text-secondary dark:text-dark-text-secondary">Conversion Rate</span>
                <span className="font-semibold text-text-primary dark:text-dark-text-primary">
                  {dashboardStats.conversionRate}%
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary dark:text-dark-text-secondary">Avg Session Time</span>
                <span className="font-semibold text-text-primary dark:text-dark-text-primary">
                  {dashboardStats.avgSessionTime}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary dark:text-dark-text-secondary">Server Uptime</span>
                <span className="font-semibold text-green-600">99.9%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-text-secondary dark:text-dark-text-secondary">API Response</span>
                <span className="font-semibold text-green-600">1.2s</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Users */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Users</CardTitle>
            <Button size="sm" variant="outline">
              Manage Users
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-3 p-3 bg-surface dark:bg-dark-surface rounded-lg">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-text-primary dark:text-dark-text-primary">
                        {user.name}
                      </span>
                      <Badge 
                        variant={user.role === 'Creator' ? 'primary' : 'secondary'}
                        className="text-xs"
                      >
                        {user.role}
                      </Badge>
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'outline'}
                        className={`text-xs ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {user.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-secondary dark:text-dark-text-secondary">
                      <span>{user.trips} trips</span>
                      <span>{user.blogs} blogs</span>
                      <span>{user.lastActive}</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Trips */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Trips</CardTitle>
            <Button size="sm" variant="outline">
              Manage Trips
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentTrips.map((trip) => (
                <div key={trip.id} className="flex items-center gap-3 p-3 bg-surface dark:bg-dark-surface rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-text-primary dark:text-dark-text-primary">
                        {trip.title}
                      </span>
                      <Badge 
                        variant={trip.status === 'approved' ? 'default' : 'outline'}
                        className={`text-xs ${
                          trip.status === 'approved' ? 'bg-green-100 text-green-800' : 
                          trip.status === 'flagged' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {trip.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-text-secondary dark:text-dark-text-secondary">
                      <span>{trip.destination}</span>
                      <span>{trip.days} days</span>
                      <span>{trip.likes} likes</span>
                      <span>{trip.copies} copies</span>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderUserManagement = () => (
    <div className="space-y-6">
      {/* Header with Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
            Filters
          </Button>
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
        </div>
      </div>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface dark:bg-dark-surface">
                <tr>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">User</th>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">Role</th>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">Status</th>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">Activity</th>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">Joined</th>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentUsers.map((user) => (
                  <tr key={user.id} className="border-t border-border dark:border-dark-border hover:bg-surface/50 dark:hover:bg-dark-surface/50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <div className="font-medium text-text-primary dark:text-dark-text-primary">
                            {user.name}
                          </div>
                          <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <Badge variant={user.role === 'Creator' ? 'primary' : 'secondary'}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={user.status === 'active' ? 'default' : 'outline'}
                        className={user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}
                      >
                        {user.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <div>{user.trips} trips</div>
                        <div className="text-text-secondary dark:text-dark-text-secondary">{user.blogs} blogs</div>
                      </div>
                    </td>
                    <td className="p-4 text-text-secondary dark:text-dark-text-secondary">
                      {user.joined}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderBlogModeration = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-text-secondary dark:text-dark-text-secondary" />
            <input
              type="text"
              placeholder="Search blogs..."
              className="w-full pl-10 pr-4 py-2 border border-border dark:border-dark-border rounded-lg bg-white dark:bg-dark-surface text-text-primary dark:text-dark-text-primary focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">All Status</Button>
          <Button variant="outline">Flagged Only</Button>
          <Button>New Blog</Button>
        </div>
      </div>

      {/* Blogs Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface dark:bg-dark-surface">
                <tr>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">Blog Title</th>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">Author</th>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">Status</th>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">Engagement</th>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">Flagged</th>
                  <th className="text-left p-4 font-medium text-text-secondary dark:text-dark-text-secondary">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentBlogs.map((blog) => (
                  <tr key={blog.id} className="border-t border-border dark:border-dark-border hover:bg-surface/50 dark:hover:bg-dark-surface/50">
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-text-primary dark:text-dark-text-primary">
                          {blog.title}
                        </div>
                        <div className="text-sm text-text-secondary dark:text-dark-text-secondary">
                          {blog.category}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-text-primary dark:text-dark-text-primary">
                      {blog.author}
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={blog.status === 'published' ? 'default' : 'outline'}
                        className={blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                      >
                        {blog.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Heart className="h-4 w-4 text-red-500" />
                          <span>{blog.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4 text-blue-500" />
                          <span>{blog.comments}</span>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {blog.flagged > 0 ? (
                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                          {blog.flagged} reports
                        </Badge>
                      ) : (
                        <span className="text-text-secondary dark:text-dark-text-secondary">None</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex gap-2">
        {['today', '7days', '30days', '90days'].map((range) => (
          <Button
            key={range}
            variant={selectedTimeRange === range ? 'primary' : 'outline'}
            onClick={() => setSelectedTimeRange(range)}
            size="sm"
          >
            {range === 'today' ? 'Today' : 
             range === '7days' ? '7 Days' :
             range === '30days' ? '30 Days' : '90 Days'}
          </Button>
        ))}
      </div>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary dark:text-dark-text-secondary text-sm">Total Users</p>
                <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">24,567</p>
                <p className="text-green-600 text-sm">+12.5% from last period</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary dark:text-dark-text-secondary text-sm">Total Revenue</p>
                <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">₹18,20,000</p>
                <p className="text-green-600 text-sm">+8.2% from last period</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary dark:text-dark-text-secondary text-sm">Active Subscriptions</p>
                <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">712</p>
                <p className="text-green-600 text-sm">+5.3% from last period</p>
              </div>
              <Crown className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-text-secondary dark:text-dark-text-secondary text-sm">Conversion Rate</p>
                <p className="text-2xl font-bold text-text-primary dark:text-dark-text-primary">3.2%</p>
                <p className="text-red-600 text-sm">-0.5% from last period</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Placeholder */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-surface dark:bg-dark-surface rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-text-secondary dark:text-dark-text-secondary mx-auto mb-2" />
                <p className="text-text-secondary dark:text-dark-text-secondary">Chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Revenue Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 bg-surface dark:bg-dark-surface rounded-lg flex items-center justify-center">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-text-secondary dark:text-dark-text-secondary mx-auto mb-2" />
                <p className="text-text-secondary dark:text-dark-text-secondary">Chart visualization would go here</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'trips', label: 'Trips', icon: MapPin },
    { id: 'blogs', label: 'Blogs', icon: FileText },
    { id: 'reports', label: 'Reports', icon: Flag },
    { id: 'analytics', label: 'Analytics', icon: TrendingUp },
    { id: 'settings', label: 'Settings', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      {/* Header */}
      <div className="bg-white dark:bg-dark-surface border-b border-border dark:border-dark-border">
        <Container maxWidth="full">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-text-primary dark:text-dark-text-primary">
                    Admin Portal
                  </h1>
                  <p className="text-sm text-text-secondary dark:text-dark-text-secondary">
                    Control the Journey from the Cockpit
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white dark:bg-dark-surface border-b border-border dark:border-dark-border">
        <Container maxWidth="full">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-primary text-primary dark:text-dark-primary'
                      : 'border-transparent text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Main Content */}
      <Container maxWidth="full" className="py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'users' && renderUserManagement()}
            {activeTab === 'blogs' && renderBlogModeration()}
            {activeTab === 'analytics' && renderAnalytics()}
            {activeTab === 'trips' && (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Trip Management
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  Trip management interface coming soon...
                </p>
              </div>
            )}
            {activeTab === 'reports' && (
              <div className="text-center py-12">
                <Flag className="h-12 w-12 text-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  Reports & Flags
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  Reports management interface coming soon...
                </p>
              </div>
            )}
            {activeTab === 'settings' && (
              <div className="text-center py-12">
                <Settings className="h-12 w-12 text-text-secondary dark:text-dark-text-secondary mx-auto mb-4" />
                <h3 className="text-lg font-medium text-text-primary dark:text-dark-text-primary mb-2">
                  System Settings
                </h3>
                <p className="text-text-secondary dark:text-dark-text-secondary">
                  Settings interface coming soon...
                </p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default AdminDashboard;