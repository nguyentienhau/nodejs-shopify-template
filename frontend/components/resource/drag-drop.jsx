import PropTypes from "prop-types";
import { DndContext, KeyboardSensor, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import {
	SortableContext,
	verticalListSortingStrategy,
	horizontalListSortingStrategy,
	useSortable
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { BlockStack } from "@shopify/polaris";

function DragDropItem({ id = "", children = "" }) {
	const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

	return (
		<div
			className="DragDropItem"
			ref={setNodeRef}
			style={{ transform: CSS.Transform.toString(transform), transition }}
			{...attributes}
			{...listeners}
		>
			{children}
		</div>
	);
}

DragDropItem.propTypes = {
	id: PropTypes.string,
	children: PropTypes.node
};

export function DragDrop({
	label = "",
	strategy = "vertical",
	items = [],
	onChange = () => {},
	renderItem = () => {},
	children = ""
}) {
	const mouseSensor = useSensor(MouseSensor, { activationConstraint: { distance: 10 } });
	const keyboardSensor = useSensor(KeyboardSensor);
	const sensors = useSensors(mouseSensor, keyboardSensor);

	function handleDragEnd(event) {
		if (event?.over?.data?.current?.sortable) {
			const startIndex = event.active.data.current.sortable.index;
			const endIndex = event.over.data.current.sortable.index;
			const newItems = items.toSpliced(startIndex, 1).toSpliced(endIndex, 0, items[startIndex]);
			onChange(newItems);
		}
	}

	return (
		<BlockStack gap="100">
			<span>{label}</span>
			<DndContext onDragEnd={handleDragEnd} sensors={sensors}>
				<SortableContext
					items={items.map((item) => item.id)}
					strategy={strategy === "horizontal" ? horizontalListSortingStrategy : verticalListSortingStrategy}
				>
					{items.map(function (item, index, items) {
						return (
							<DragDropItem key={item.id} id={item.id}>
								{renderItem(item, index, items)}
							</DragDropItem>
						);
					})}
				</SortableContext>
				{children}
			</DndContext>
		</BlockStack>
	);
}

DragDrop.propTypes = {
	label: PropTypes.string,
	items: PropTypes.array,
	onChange: PropTypes.func,
	renderItem: PropTypes.func,
	strategy: PropTypes.string,
	children: PropTypes.node
};
