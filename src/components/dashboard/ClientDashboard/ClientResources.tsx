"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil, Trash2, Pin, Paperclip, Download, Plus } from "lucide-react";

interface Task {
  id: string;
  text: string;
}

interface Note {
  id: string;
  text: string;
  lastEdited: {
    by: string;
    date: string;
  };
  isPinned: boolean;
}

interface Document {
  id: string;
  name: string;
  isRequired: boolean;
  isReceived: boolean;
  canUpload: boolean;
}

export default function ClientResources() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", text: "Upload Proof of Address" },
    { id: "2", text: "Signup for Credit Hero Score and Share Login Details" },
  ]);

  const [notes, setNotes] = useState<Note[]>([
    {
      id: "1",
      text: "Update credit things in the report.\n\nDo what to do",
      lastEdited: {
        by: "Carlos Corbin",
        date: "11/05/24 @ 06:39 am",
      },
      isPinned: false,
    },
  ]);

  const [documents, setDocuments] = useState<Document[]>([
    {
      id: "1",
      name: "Client Agreement",
      isRequired: true,
      isReceived: true,
      canUpload: true,
    },
    {
      id: "2",
      name: "Photo ID Copy",
      isRequired: true,
      isReceived: true,
      canUpload: true,
    },
    {
      id: "3",
      name: "Utility Bill/Proof of Address",
      isRequired: true,
      isReceived: false,
      canUpload: true,
    },
    {
      id: "4",
      name: "Social Security Card (optional)",
      isRequired: false,
      isReceived: false,
      canUpload: true,
    },
  ]);

  const [newTask, setNewTask] = useState("");
  const [editingNoteId, setEditingNoteId] = useState<string | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);

  const addTask = () => {
    if (newTask.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: newTask.trim() }]);
      setNewTask("");
    }
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: string, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const toggleDocument = (id: string) => {
    setDocuments(
      documents.map((doc) =>
        doc.id === id ? { ...doc, isReceived: !doc.isReceived } : doc
      )
    );
  };

  const handleFileUpload = (
    docId: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log(`Uploading file for document ${docId}:`, file);
      // Mark the document as received
      setDocuments(
        documents.map((doc) =>
          doc.id === docId ? { ...doc, isReceived: true } : doc
        )
      );
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      {/* Tasks Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Tasks</h2>
          <div className="flex gap-2">
            <Input
              placeholder="New task"
              className="focus:outline-none"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addTask()}
            />
            <Button
              className="bg-purple-600 hover:bg-purple-700"
              onClick={addTask}
            >
              <Plus className="w-4 h-4 mr-2" /> Add Task
            </Button>
          </div>
        </div>

        <Tabs defaultValue="client" className="w-full">
          <TabsContent value="client" className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-center justify-between p-3 bg-[#F9FAFB] shadow-none border-none rounded-lg"
              >
                {editingTaskId === task.id ? (
                  <Input
                    value={task.text}
                    onChange={(e) => editTask(task.id, e.target.value)}
                    onBlur={() => setEditingTaskId(null)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        setEditingTaskId(null);
                      }
                    }}
                    autoFocus
                  />
                ) : (
                  <span>{task.text}</span>
                )}
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setEditingTaskId(task.id)}
                  >
                    <Pencil className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteTask(task.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
            {/* <Button variant="link" className="text-sm">
              View Completed Client Tasks
            </Button> */}
          </TabsContent>
        </Tabs>
      </div>

      {/* Notes Section */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Notes ({notes.length})</h2>
        </div>

        {notes.map((note) => (
          <Card
            key={note.id}
            className="mb-4 bg-[#F9FAFB] shadow-none border-none"
          >
            <CardContent className="p-4">
              <div className="text-sm text-muted-foreground mb-2">
                Last edited by {note.lastEdited.by} - {note.lastEdited.date}
              </div>
              {editingNoteId === note.id ? (
                <Textarea
                  defaultValue={note.text}
                  className="mb-2"
                  onBlur={(e) => {
                    setNotes(
                      notes.map((n) =>
                        n.id === note.id ? { ...n, text: e.target.value } : n
                      )
                    );
                    setEditingNoteId(null);
                  }}
                />
              ) : (
                <div className="whitespace-pre-wrap mb-4">{note.text}</div>
              )}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingNoteId(note.id)}
                >
                  <Pencil className="w-4 h-4 mr-2" /> Edit Note
                </Button>
                {/* <Button
                  onClick={() => {
                    setNotes((notes) => {
                      return notes.filter((n) => n.id !== note.id);
                    });
                    console.log(note.id);
                  }}
                  variant="outline"
                  size="sm"
                >
                  <Trash2 className="w-4 h-4 mr-2" /> Delete
                </Button> */}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Documents Section */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Documents</h2>
        <div className="space-y-4">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 bg-[#F9FAFB] shadow-none border-none rounded-lg"
            >
              <div className="flex items-center gap-3">
                <Checkbox
                  checked={doc.isReceived}
                  onCheckedChange={() => toggleDocument(doc.id)}
                  id={`doc-${doc.id}`}
                />
                <label htmlFor={`doc-${doc.id}`} className="text-sm">
                  {doc.name}
                </label>
              </div>
              <div className="flex gap-2">
                {!doc.isReceived && (
                  <>
                    <input
                      type="file"
                      id={`file-${doc.id}`}
                      className="hidden"
                      onChange={(e) => handleFileUpload(doc.id, e)}
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        document.getElementById(`file-${doc.id}`)?.click()
                      }
                    >
                      Add
                    </Button>
                  </>
                )}
                {doc.isReceived && (
                  <>
                    <Button variant="ghost" size="icon">
                      <Download className="w-4 h-4" />
                    </Button>
                    {/* <Button
                      onClick={() => {
                        setDocuments((docs) => {
                          return docs.filter((d) => d.id !== doc.id);
                        });
                      }}
                      variant="ghost"
                      size="icon"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button> */}
                  </>
                )}
              </div>
            </div>
          ))}
          {/* <Button variant="link" className="text-sm">
            Customize List
          </Button> */}
        </div>
      </div>
    </div>
  );
}
