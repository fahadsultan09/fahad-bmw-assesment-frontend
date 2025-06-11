import React from 'react';
import ActionIcon from '../components/ActionIcon';
import type { CarRow } from './types';

type Props = {
    rowData: CarRow;
    onView: () => void;
    onDelete: () => void;
};

const ActionCellRenderer: React.FC<Props> = ({ onView, onDelete }) => {
    return (
        <div>
            <ActionIcon type="view" onClick={onView} />
            {/* <ActionIcon type="edit" onClick={() => console.log('Edit')} /> */}
            <ActionIcon type="delete" onClick={onDelete} />
        </div>
    );
};

export default ActionCellRenderer;
