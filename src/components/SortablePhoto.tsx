import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import Photo from "./Photo.tsx";

interface SortablePhotoProps {
    url: string;
    index: number;
    isSelected: boolean;
    onSelected: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}

const SortablePhoto: React.FC<SortablePhotoProps> = (props) => {
    const sortable = useSortable({ id: props.url });
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = sortable;

    const style: React.CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <Photo
            ref={setNodeRef}
            style={style}
            {...props}
            {...attributes}
            {...listeners}
        />
    );
};

export default SortablePhoto;
