import React, { forwardRef, CSSProperties } from 'react';
import {Checkbox} from "@nextui-org/react";
interface PhotoProps extends React.HTMLAttributes<HTMLDivElement> {
    url: string;
    index: number;
    isSelected: boolean;
    onSelected: (evt: React.ChangeEvent<HTMLInputElement>) => void;
    faded?: boolean;
    style?: CSSProperties;
}

const Photo = forwardRef<HTMLDivElement, PhotoProps>(({ url, index, isSelected, onSelected, faded, style, ...props }, ref) => {
        const inlineStyles: CSSProperties = {
            opacity: faded ? '0.8' : '1',
            transformOrigin: '0 0',
            gridRowStart: index === 0 ? 'span 2' : 'auto',
            gridColumnStart: index === 0 ? 'span 2' : 'auto',
            ...style,
        };

        return (
        <div
            ref={ref}
            style={inlineStyles}
            {...props}
            className={`relative border border-dark rounded-md hover:cursor-pointer group ${!isSelected ? 'hover:border-transparent' : ''}`}
        >

            <img className="w-full h-full object-cover rounded-md" src={url} alt={url}/>

            <Checkbox
                isSelected={isSelected}
                name={url}
                id={url}
                className={`absolute top-2 left-2 hidden group-hover:block ${isSelected ? 'block' : ''}`}
                color="primary"
                onChange={onSelected}
            >

            </Checkbox>
            <div
                className={`absolute top-0 left-0 bottom-0 right-0 w-full h-full z-10 rounded-md ease-in duration-300 pointer-events-none ${!isSelected ? 'group-hover:bg-black group-hover:bg-opacity-50' : ''}`}></div>
        </div>
    )
    }
);

export default Photo;
