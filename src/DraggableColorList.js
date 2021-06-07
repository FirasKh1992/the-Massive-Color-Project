import React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import DragableColorBox from './DragableColorBox';
const DraggableColorList = SortableContainer((props) => {
    const { colors, removeColor } = props
    return (
        <div style={{ height: "100%" }}>
            {colors.map((color,i) => (
                <DragableColorBox
                    key={color.name}
                    index={i}
                    color={color.color}
                    name={color.name}
                    handleClick={() => (
                        removeColor(color.name))} />
            ))}</div>
    )
})
export default DraggableColorList;
