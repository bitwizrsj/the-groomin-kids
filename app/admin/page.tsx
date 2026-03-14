'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { School, Plus, CreditCard as Edit, Trash2 } from 'lucide-react';
import { toast, Toaster } from 'sonner';

interface Program {
  id: string;
  title: string;
  description: string;
  age_group: string;
  icon: string;
  order_index: number;
}

interface Feature {
  id: string;
  title: string;
  description: string;
  icon: string;
  order_index: number;
}

interface Activity {
  id: string;
  title: string;
  description: string;
  image_url: string;
  category: string;
}

export default function AdminPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [features, setFeatures] = useState<Feature[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);

  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [editingFeature, setEditingFeature] = useState<Feature | null>(null);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);

  const [programForm, setProgramForm] = useState({ title: '', description: '', age_group: '', icon: 'baby', order_index: 0 });
  const [featureForm, setFeatureForm] = useState({ title: '', description: '', icon: 'heart', order_index: 0 });
  const [activityForm, setActivityForm] = useState({ title: '', description: '', image_url: '', category: 'activities' });

  async function fetchData() {
    try {
      const [programsRes, featuresRes, activitiesRes] = await Promise.all([
        fetch('/api/programs'),
        fetch('/api/features'),
        fetch('/api/activities'),
      ]);

      const [programsData, featuresData, activitiesData] = await Promise.all([
        programsRes.json(),
        featuresRes.json(),
        activitiesRes.json(),
      ]);

      setPrograms(programsData);
      setFeatures(featuresData);
      setActivities(activitiesData);
    } catch (error: any) {
      toast.error('Failed to load data');
    }
  }

  async function saveProgram() {
    try {
      if (editingProgram) {
        const res = await fetch('/api/programs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProgram.id, ...programForm }),
        });
        if (!res.ok) throw new Error('Failed to update program');
        toast.success('Program updated successfully!');
      } else {
        const res = await fetch('/api/programs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(programForm),
        });
        if (!res.ok) throw new Error('Failed to create program');
        toast.success('Program created successfully!');
      }
      setEditingProgram(null);
      setProgramForm({ title: '', description: '', age_group: '', icon: 'baby', order_index: 0 });
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function deleteProgram(id: string) {
    try {
      const res = await fetch(`/api/programs?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete program');
      toast.success('Program deleted successfully!');
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function saveFeature() {
    try {
      if (editingFeature) {
        const res = await fetch('/api/features', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingFeature.id, ...featureForm }),
        });
        if (!res.ok) throw new Error('Failed to update feature');
        toast.success('Feature updated successfully!');
      } else {
        const res = await fetch('/api/features', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(featureForm),
        });
        if (!res.ok) throw new Error('Failed to create feature');
        toast.success('Feature created successfully!');
      }
      setEditingFeature(null);
      setFeatureForm({ title: '', description: '', icon: 'heart', order_index: 0 });
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function deleteFeature(id: string) {
    try {
      const res = await fetch(`/api/features?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete feature');
      toast.success('Feature deleted successfully!');
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function saveActivity() {
    try {
      if (editingActivity) {
        const res = await fetch('/api/activities', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingActivity.id, ...activityForm }),
        });
        if (!res.ok) throw new Error('Failed to update activity');
        toast.success('Activity updated successfully!');
      } else {
        const res = await fetch('/api/activities', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(activityForm),
        });
        if (!res.ok) throw new Error('Failed to create activity');
        toast.success('Activity created successfully!');
      }
      setEditingActivity(null);
      setActivityForm({ title: '', description: '', image_url: '', category: 'activities' });
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  async function deleteActivity(id: string) {
    try {
      const res = await fetch(`/api/activities?id=${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error('Failed to delete activity');
      toast.success('Activity deleted successfully!');
      fetchData();
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Toaster />
      <header className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-2 rounded-lg">
              <School className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Admin Panel</h1>
              <p className="text-sm text-slate-600">Grooming Kids Preschool</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => window.location.replace('/')}>
              View Website
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="programs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 max-w-md">
            <TabsTrigger value="programs">Programs</TabsTrigger>
            <TabsTrigger value="features">Features</TabsTrigger>
            <TabsTrigger value="activities">Activities</TabsTrigger>
          </TabsList>

          <TabsContent value="programs" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Manage Programs</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Program
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingProgram ? 'Edit' : 'Add'} Program</DialogTitle>
                    <DialogDescription>Create or update program information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input value={programForm.title} onChange={(e) => setProgramForm({ ...programForm, title: e.target.value })} />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={programForm.description} onChange={(e) => setProgramForm({ ...programForm, description: e.target.value })} />
                    </div>
                    <div>
                      <Label>Age Group</Label>
                      <Input value={programForm.age_group} onChange={(e) => setProgramForm({ ...programForm, age_group: e.target.value })} />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Select value={programForm.icon} onValueChange={(value) => setProgramForm({ ...programForm, icon: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="baby">Baby</SelectItem>
                          <SelectItem value="blocks">Blocks</SelectItem>
                          <SelectItem value="book-open">Book Open</SelectItem>
                          <SelectItem value="palette">Palette</SelectItem>
                          <SelectItem value="book">Book</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Order</Label>
                      <Input type="number" value={programForm.order_index} onChange={(e) => setProgramForm({ ...programForm, order_index: parseInt(e.target.value) })} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={saveProgram}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {programs.map((program) => (
                <Card key={program.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{program.title}</CardTitle>
                        <CardDescription>{program.age_group}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingProgram(program);
                            setProgramForm(program);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteProgram(program.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">{program.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="features" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Manage Features</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Feature
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingFeature ? 'Edit' : 'Add'} Feature</DialogTitle>
                    <DialogDescription>Create or update feature information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input value={featureForm.title} onChange={(e) => setFeatureForm({ ...featureForm, title: e.target.value })} />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={featureForm.description} onChange={(e) => setFeatureForm({ ...featureForm, description: e.target.value })} />
                    </div>
                    <div>
                      <Label>Icon</Label>
                      <Select value={featureForm.icon} onValueChange={(value) => setFeatureForm({ ...featureForm, icon: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="heart">Heart</SelectItem>
                          <SelectItem value="user">User</SelectItem>
                          <SelectItem value="palette">Palette</SelectItem>
                          <SelectItem value="smile">Smile</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Order</Label>
                      <Input type="number" value={featureForm.order_index} onChange={(e) => setFeatureForm({ ...featureForm, order_index: parseInt(e.target.value) })} />
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={saveFeature}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {features.map((feature) => (
                <Card key={feature.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{feature.title}</CardTitle>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingFeature(feature);
                            setFeatureForm(feature);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteFeature(feature.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-slate-800">Manage Activities</h2>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-blue-600 to-indigo-600">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Activity
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>{editingActivity ? 'Edit' : 'Add'} Activity</DialogTitle>
                    <DialogDescription>Create or update activity information</DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Title</Label>
                      <Input value={activityForm.title} onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })} />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea value={activityForm.description} onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })} />
                    </div>
                    <div>
                      <Label>Image URL</Label>
                      <Input value={activityForm.image_url} onChange={(e) => setActivityForm({ ...activityForm, image_url: e.target.value })} />
                    </div>
                    <div>
                      <Label>Category</Label>
                      <Select value={activityForm.category} onValueChange={(value) => setActivityForm({ ...activityForm, category: value })}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="activities">Activities</SelectItem>
                          <SelectItem value="events">Events</SelectItem>
                          <SelectItem value="admissions">Admissions</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button onClick={saveActivity}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>

            <div className="grid gap-4">
              {activities.map((activity) => (
                <Card key={activity.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{activity.title}</CardTitle>
                        <CardDescription className="capitalize">{activity.category}</CardDescription>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setEditingActivity(activity);
                            setActivityForm(activity);
                          }}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => deleteActivity(activity.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 mb-2">{activity.description}</p>
                    <img src={activity.image_url} alt={activity.title} className="w-full h-48 object-cover rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
