import { useReactFlow } from "@xyflow/react";

const PlusNode = ({
  id,
  source,
  target,
  sourceX,
  sourceY,
  targetX,
  targetY,
}) => {
  const midX = (sourceX + targetX) / 2;
  const midY = (sourceY + targetY) / 2;
  const { addNodes } = useReactFlow();

  const handleAddNode = () => {
    addNodes({
      id: `option-${Date.now()}`,
      position: { x: midX + 25, y: midY - 15 },
      data: {
        label: "Option Node",
        sourceId: source,
        targetId: target,
        edgeId: id,
        midX: midX,
        midY: midY,
      },
      type: "option",
    });
  };

  return (
    <>
      <path
        id={id}
        stroke="gray"
        strokeWidth={2}
        fill="none"
        d={`M${sourceX},${sourceY} L${targetX},${targetY}`}
        className="react-flow__edge-path"
      />

      <foreignObject x={midX - 15} y={midY - 15} width={30} height={30}>
        <button
          type="button"
          className="px-2 pb-1 text-gray-500 bg-white border border-gray-500 rounded-full hover:bg-gray-50"
          onClick={handleAddNode}
        >
          +
        </button>
      </foreignObject>
    </>
  );
};

export default PlusNode;
