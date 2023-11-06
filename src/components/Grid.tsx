import React, { ReactNode } from 'react';

interface GridProps {
    children: ReactNode;
    columns: string;
}

const Grid: React.FC<GridProps> = ({ children, columns }) => {
    return (
        <div className={`grid p-6 gap-6 mx-auto ${columns}`}>
            {children}
        </div>
    );
};

export default Grid;
