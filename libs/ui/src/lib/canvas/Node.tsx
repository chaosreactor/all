import { NodeProps as FlowNodeProps, useEdges } from 'reactflow';
import { NodeSpecJSON } from 'behave-graph';
import InputSocket from './InputSocket';
import NodeContainer from './NodeContainer';
import OutputSocket from './OutputSocket';
import { useChangeNodeData } from '../../../vendor/behave-flow/src/hooks/useChangeNodeData';
import { isHandleConnected } from '../../../vendor/behave-flow/src/util/isHandleConnected';

type NodeProps = FlowNodeProps & {
  spec: NodeSpecJSON;
};

const getTitle = (type: string) => {
  const tokens = type.split('/');
  const end = tokens[Math.min(tokens.length - 1, 1)]; // handles polymorphic node naming structure
  const spaces = end.replace(/([A-Z])/g, ' $1');
  return spaces.charAt(0).toUpperCase() + spaces.slice(1);
};

const getPairs = <T, U>(arr1: T[], arr2: U[]) => {
  const max = Math.max(arr1.length, arr2.length);
  const pairs = [];
  for (let i = 0; i < max; i++) {
    const pair: [T | undefined, U | undefined] = [arr1[i], arr2[i]];
    pairs.push(pair);
  }
  console.log('pairs', pairs);
  return pairs;
};

export const Node = ({ id, data, spec, selected }: NodeProps) => {
  const edges = useEdges();
  const handleChange = useChangeNodeData(id);
  const pairs = getPairs(spec.inputs, spec.outputs);
  return (
    <NodeContainer
      title={getTitle(spec.type)}
      category={spec.category}
      selected={selected}
    >
      {pairs.map(([input, output], ix) => (
        <div
          key={ix}
          className="flex flex-row justify-between gap-8 relative px-2"
        >
          {input && (
            <InputSocket
              {...input}
              value={data[input.name] ?? input.defaultValue}
              onChange={handleChange}
              connected={isHandleConnected(edges, id, input.name, 'target')}
            />
          )}
          {output && (
            <OutputSocket
              {...output}
              connected={isHandleConnected(edges, id, output.name, 'source')}
            />
          )}
        </div>
      ))}
    </NodeContainer>
  );
};
