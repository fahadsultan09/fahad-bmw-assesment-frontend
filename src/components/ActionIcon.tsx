import React from 'react';
import { FaTrash, FaEye, FaEdit } from 'react-icons/fa';
import { IconType } from 'react-icons';

interface IconProps {
    type: 'delete' | 'view' | 'edit';
    onClick: () => void;
}

const iconMap: Record<IconProps['type'], IconType> = {
    delete: FaTrash,
    view: FaEye,
    edit: FaEdit,
};

const iconColors: Record<IconProps['type'], string> = {
    view: '#1976d2',   // blue
    delete: '#d32f2f', // red
    edit: '#5f6368',   // gray
};

const iconTooltips: Record<IconProps['type'], string> = {
    view: 'View',
    delete: 'Delete',
    edit: 'Edit',
};

const ActionIcon: React.FC<IconProps> = ({ type, onClick }) => {
    const IconComponent = iconMap[type] as React.ComponentType;

    if (!IconComponent) return null;

    return (
        <span
            onClick={onClick}
            title={iconTooltips[type]}
            style={{
                cursor: 'pointer',
                margin: '0 8px',
                fontSize: '18px',
                color: iconColors[type],
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    onClick();
                }
            }}
        >
            <IconComponent />
        </span>
    );
};

export default ActionIcon;
