import { useState } from 'react';
import { motion } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Activity, Flame, Brain, Apple, Dumbbell, Heart } from 'lucide-react';

const initialWidgets = [
  { id: 'stats', title: 'Daily Stats', icon: Activity },
  { id: 'calories', title: 'Calories', icon: Flame },
  { id: 'mindfulness', title: 'Mindfulness', icon: Brain },
  { id: 'nutrition', title: 'Nutrition', icon: Apple },
  { id: 'workout', title: 'Workout', icon: Dumbbell },
  { id: 'health', title: 'Health', icon: Heart }
];

export const DraggableDashboard = () => {
  const [widgets, setWidgets] = useState(initialWidgets);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;
    
    const items = Array.from(widgets);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setWidgets(items);
  };

  return (
    <div className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Customize Your Dashboard</h2>
        <p className="text-center text-gray-600 mb-12">Drag and drop widgets to personalize your wellness journey</p>
        
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="dashboard" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid md:grid-cols-3 gap-6"
              >
                {widgets.map((widget, index) => (
                  <Draggable key={widget.id} draggableId={widget.id} index={index}>
                    {(provided, snapshot) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={`bg-white rounded-2xl p-6 shadow-lg ${
                          snapshot.isDragging ? 'shadow-2xl scale-105' : ''
                        }`}
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <widget.icon className="w-8 h-8 text-purple-600" />
                          <h3 className="text-lg font-semibold">{widget.title}</h3>
                        </div>
                        <div className="h-32 bg-gray-50 rounded-lg flex items-center justify-center">
                          <p className="text-gray-500">Widget Content</p>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};