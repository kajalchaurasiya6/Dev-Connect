import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { Plus, Users, Code, MessageCircle, TrendingUp } from 'lucide-react';
import LoadingSpinner from '../components/common/LoadSpinner';
import type { User } from '../types';
import DashboardCard from '../components/ui/DashboardCard';

const Dashboard: React.FC = () => {
  const { user }: { user: User | null } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user?.displayName}! 👋
          </h1>
          <p className="text-muted-foreground">
            Here's what's happening in your developer network
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <DashboardCard title='connections' value={'42'} Icon={Users} targetRoute='' />
          <DashboardCard title='Projects' value={'8'} Icon={Code} targetRoute=''/>
          <DashboardCard title='Messages' value={'15'} Icon={MessageCircle} targetRoute='/messages' />
          <DashboardCard title='Profile Views' value={'127'} Icon={TrendingUp} targetRoute='' />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Button className="justify-start h-auto p-4 flex-col items-start">
                    <div className="flex items-center mb-2">
                      <Plus className="h-4 w-4 mr-2" />
                      Share a Project
                    </div>
                    <p className="text-sm text-left opacity-80">
                      Show off your latest work to the community
                    </p>
                  </Button>

                  <Button variant="outline" className="justify-start h-auto p-4 flex-col items-start">
                    <div className="flex items-center mb-2">
                      <Users className="h-4 w-4 mr-2" />
                      Find Developers
                    </div>
                    <p className="text-sm text-left opacity-80">
                      Connect with developers in your tech stack
                    </p>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity Feed */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/20">
                    <img
                      src="https://ui-avatars.com/api/?name=Sarah Johnson&background=random"
                      alt="Sarah Johnson"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Sarah Johnson</span> shared a new project:
                        <span className="font-medium text-primary"> "E-commerce Dashboard"</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/20">
                    <img
                      src="https://ui-avatars.com/api/?name=Mike Chen&background=random"
                      alt="Mike Chen"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Mike Chen</span> wants to connect with you
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline">Accept</Button>
                        <Button size="sm" variant="ghost">Decline</Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start space-x-3 p-3 rounded-lg bg-secondary/20">
                    <img
                      src="https://ui-avatars.com/api/?name=Alex Rivera&background=random"
                      alt="Alex Rivera"
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium">Alex Rivera</span> liked your project
                        <span className="font-medium text-primary"> "Weather App"</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Profile Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Your Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <img
                    src={user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=random`}
                    alt={user?.displayName}
                    className="w-20 h-20 rounded-full mx-auto mb-4"
                  />
                  <h3 className="font-semibold text-lg">{user?.displayName}</h3>
                  <p className="text-sm text-muted-foreground capitalize mb-3">{user?.experience} Developer</p>
                  {user?.availableForWork && (
                    <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                      Available for work
                    </Badge>
                  )}
                </div>

                <div className="mt-4">
                  <h4 className="font-medium mb-2">Skills</h4>
                  <div className="flex flex-wrap gap-1">
                    {user?.skills?.slice(0, 6).map((skill, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Button variant="outline" size="sm" className="w-full mt-4">
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Trending Topics */}
            <Card>
              <CardHeader>
                <CardTitle>Trending in Dev Community</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">#React19</span>
                    <span className="text-xs text-muted-foreground">342 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">#AITooling</span>
                    <span className="text-xs text-muted-foreground">198 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">#WebDev</span>
                    <span className="text-xs text-muted-foreground">156 posts</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">#OpenSource</span>
                    <span className="text-xs text-muted-foreground">89 posts</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Suggested Connections */}
            <Card>
              <CardHeader>
                <CardTitle>Suggested for You</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://ui-avatars.com/api/?name=Emma Wilson&background=random"
                        alt="Emma Wilson"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">Emma Wilson</p>
                        <p className="text-xs text-muted-foreground">Full-stack Dev</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Connect</Button>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <img
                        src="https://ui-avatars.com/api/?name=David Kim&background=random"
                        alt="David Kim"
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-sm font-medium">David Kim</p>
                        <p className="text-xs text-muted-foreground">Frontend Dev</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
