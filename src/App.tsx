import React, { useState } from 'react';
import {DndContext, closestCenter, MouseSensor, TouchSensor, DragOverlay, useSensor, useSensors} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import {Checkbox} from "@nextui-org/react";

import Grid from "./components/Grid.tsx";
import SortablePhoto from "./components/SortablePhoto.tsx";

import Photo from "./components/Photo.tsx";
import photos from './data/photos.json';

type UploadGalleryProps = {};

const UploadGallery: React.FC<UploadGalleryProps> = () => {
    const [items, setItems] = useState<string[]>(photos);
    const [selectedItems, setSelectedItems] = useState<string[]>([])
    const [activeId, setActiveId] = useState<string | null>(null);

    // Initialize DND sensors for mouse and touch events
    const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

    const handleDelete = () => {
        // Remove selected items from the list
        const updatedItems = items.filter(item => !selectedItems.includes(item));
        setItems(updatedItems);
        setSelectedItems([]);
    };

    const handleSelect = (evt: React.ChangeEvent<HTMLInputElement>) => {
        // Handle item selection and deselection
        const selectedValue = evt.target.name;
        const isChecked = evt.target.checked;

        const isSelected = selectedItems.includes(selectedValue);

        if (isChecked && !isSelected) {
            setSelectedItems(prevState => [...prevState, selectedValue]);
        } else if (!isChecked && isSelected) {
            setSelectedItems(prevState => prevState.filter(item => item !== selectedValue));
        }
    }

    const handleDragStart = (event: any) => {
        // Set the active item being dragged
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: any) => {
        const { active, over } = event;

        if (active.id !== over.id && activeId) {
            // Reorder the items when a drag operation ends
            setItems((prevItems) => {
                const oldIndex = prevItems.indexOf(activeId);
                const newIndex = prevItems.indexOf(over.id);

                return arrayMove(prevItems, oldIndex, newIndex);
            });
        }

        setActiveId(null);
    };

    const handleDragCancel = () => {
        // Clear the active item when drag operation is canceled
        setActiveId(null);
    };

    return (
        <div className="bg-white w-full">
            <div className="container">
                <div className="flex min-h-screen flex-col items-center justify-center">
                    <div className="bg-secondary w-full rounded-md border border-dark">
                        <div className="p-6 flex items-center justify-between">

                            {!!selectedItems.length ? (
                                <>
                                    <div className="flex items-center">
                                        <Checkbox color="primary" isSelected={true}/>
                                        <div>{selectedItems.length}</div>
                                        <label htmlFor="default-checkbox"
                                               className="ml-2 text-md font-semibold text-gray-900">Files
                                            Selected</label>
                                    </div>

                                    <button className="text-red-600 text-md font-medium hover:cursor-pointer hover:underline" onClick={handleDelete}>
                                        <span>Delete Files</span>
                                    </button>
                                </>
                            ) :
                                <h3 className="text-black text-md font-bold">
                                    Gallery
                                </h3>
                            }


                        </div>
                        <div className="border-b border-dark"></div>
                        <DndContext
                            sensors={sensors}
                            collisionDetection={closestCenter}
                            onDragStart={handleDragStart}
                            onDragEnd={handleDragEnd}
                            onDragCancel={handleDragCancel}
                        >
                            <SortableContext items={items} strategy={rectSortingStrategy}>
                                <Grid columns="grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                                    {items.map((url, index) => (
                                        <SortablePhoto key={url} url={url} index={index}
                                                       isSelected={selectedItems.includes(url)}
                                                       onSelected={handleSelect}/>
                                    ))}

                                    <div className="flex items-center justify-center flex-col gap-5 border-2 border-dark border-dotted rounded-md hover:cursor-pointer">
                                        <img className="w-10 h-10" src="/images/placeholder_image.png" alt="Placeholder image"/>
                                        <h5 className="text-black text-md font-normal">Add Images</h5>
                                    </div>
                                </Grid>
                            </SortableContext>

                            <DragOverlay adjustScale={true}>
                                {activeId ? <Photo url={activeId} index={items.indexOf(activeId)} isSelected={selectedItems.includes(activeId)} onSelected={handleSelect}/> : null}
                            </DragOverlay>
                        </DndContext>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UploadGallery;
