import React, { useMemo } from 'react';
import { Card, Typography, Empty, Avatar } from 'antd';
import { useResourceHelpers } from '@/utils/i18nBridge';
import type { CreateUserLocation } from '@/types/user-managment.types';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  Node,
  Edge,
  NodeTypes,
  Position,
  Handle,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { UserOutlined, EnvironmentOutlined } from '@ant-design/icons';
import dagre from 'dagre';

const { Title, Text } = Typography;

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
  avatar?: string;
  subordinates?: Employee[];
}

interface LocationWithEmployees extends CreateUserLocation {
  employees: Employee[];
  isHeadLocation?: boolean;
}

interface OrganizationalChartProps {
  locations: LocationWithEmployees[];
}

interface NodeData extends Record<string, unknown> {
  id: string;
  type: 'head' | 'branch' | 'employee';
  label: string;
  position?: string;
  department?: string;
  avatar?: string;
}

// Custom node for locations (circle)
const LocationNode = ({ data }: { data: NodeData }) => (
  <div
    style={{
      width: 120,
      height: 120,
      borderRadius: '50%',
      background: data.type === 'head' ? '#e6f7ff' : '#f6ffed',
      border: '2px solid #91d5ff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      position: 'relative',
    }}
  >
    {/* Connection handles */}
    <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
    <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />

    <EnvironmentOutlined
      style={{ fontSize: 32, color: data.type === 'head' ? '#1890ff' : '#52c41a' }}
    />
    <div style={{ fontWeight: 600, fontSize: 18, marginTop: 8, textAlign: 'center' }}>
      {data.label}
    </div>
  </div>
);

// Custom node for employees (rectangle)
const EmployeeNode = ({ data }: { data: NodeData }) => (
  <div
    style={{
      minWidth: 180,
      minHeight: 60,
      borderRadius: 8,
      background: '#fff',
      border: '2px solid #91d5ff',
      display: 'flex',
      alignItems: 'center',
      boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
      padding: '8px 16px',
      gap: 12,
      position: 'relative',
    }}
  >
    {/* Connection handles */}
    <Handle type="target" position={Position.Top} style={{ background: '#555' }} />
    <Handle type="source" position={Position.Bottom} style={{ background: '#555' }} />

    <Avatar
      size={40}
      src={data.avatar}
      icon={<UserOutlined />}
      style={{ backgroundColor: '#1890ff' }}
    />
    <div>
      <div style={{ fontWeight: 600, fontSize: 16 }}>{data.label}</div>
      <div style={{ fontSize: 13, color: '#666' }}>{data.position}</div>
      <div style={{ fontSize: 13, color: '#666' }}>{data.department}</div>
    </div>
  </div>
);

const nodeTypes: NodeTypes = {
  location: LocationNode,
  employee: EmployeeNode,
};

const nodeWidth = 180;
const nodeHeight = 80;
const circleSize = 120;

// Simple fallback layout function
function getSimpleLayout(nodes: Node<NodeData>[], edges: Edge[]) {
  console.log('Using simple layout fallback');

  const layoutedNodes = nodes.map((node, index) => ({
    ...node,
    position: {
      x: (index % 3) * 250,
      y: Math.floor(index / 3) * 150,
    },
    sourcePosition: Position.Bottom,
    targetPosition: Position.Top,
  }));

  return { nodes: layoutedNodes, edges };
}

function getLayoutedElements(nodes: Node<NodeData>[], edges: Edge[], direction = 'TB') {
  try {
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));
    dagreGraph.setGraph({ rankdir: direction, nodesep: 60, ranksep: 100 });

    nodes.forEach(node => {
      dagreGraph.setNode(
        node.id,
        node.type === 'location'
          ? { width: circleSize, height: circleSize }
          : { width: nodeWidth, height: nodeHeight }
      );
    });

    edges.forEach(edge => dagreGraph.setEdge(edge.source, edge.target));
    dagre.layout(dagreGraph);

    const layoutedNodes = nodes.map(node => {
      const nodeWithPosition = dagreGraph.node(node.id);
      return {
        ...node,
        position: {
          x: nodeWithPosition.x - (node.type === 'location' ? circleSize / 2 : nodeWidth / 2),
          y: nodeWithPosition.y - (node.type === 'location' ? circleSize / 2 : nodeHeight / 2),
        },
        sourcePosition: Position.Bottom,
        targetPosition: Position.Top,
      };
    });

    return { nodes: layoutedNodes, edges };
  } catch (error) {
    console.error('Dagre layout failed, using simple fallback:', error);
    return getSimpleLayout(nodes, edges);
  }
}

const OrganizationalChart: React.FC<OrganizationalChartProps> = ({ locations }) => {
  const resourceHelpers = useResourceHelpers();
  const { nodes, edges } = useMemo(() => {
    if (!locations || locations.length === 0) {
      return { nodes: [], edges: [] };
    }

    const nodes: Node<NodeData>[] = [];
    const edges: Edge[] = [];
    let edgeId = 0;

    const headLocation = locations.find(loc => loc.isHeadLocation);

    if (!headLocation) {
      return { nodes: [], edges: [] };
    }

    // Head location node (circle)
    nodes.push({
      id: headLocation.key,
      type: 'location',
      data: { type: 'head', label: headLocation.name, id: headLocation.key },
      position: { x: 0, y: 0 },
    });

    // Head employees (rectangles)
    headLocation.employees.forEach((emp, idx) => {
      const empId = `${headLocation.key}-emp-${idx}`;
      nodes.push({
        id: empId,
        type: 'employee',
        data: {
          type: 'employee',
          id: empId,
          label: emp.name,
          position: emp.position,
          department: emp.department,
          avatar: emp.avatar,
        },
        position: { x: 0, y: 0 },
      });

      const edgeData = {
        id: `edge-${edgeId++}`,
        source: headLocation.key,
        target: empId,
        type: 'default', // Changed to 'default' for better compatibility
        style: { stroke: '#1890ff', strokeWidth: 3 }, // Increased width for visibility
        animated: false,
      };
      edges.push(edgeData);
    });

    // Branch locations (circles)
    const branchLocations = locations.filter(loc => !loc.isHeadLocation);

    branchLocations.forEach(branch => {
      nodes.push({
        id: branch.key,
        type: 'location',
        data: { type: 'branch', label: branch.name, id: branch.key },
        position: { x: 0, y: 0 },
      });

      // Connect head location (or last head employee if exists) to branch
      let sourceId: string;
      if (headLocation.employees.length > 0) {
        // Connect to last head employee
        sourceId = `${headLocation.key}-emp-${headLocation.employees.length - 1}`;
      } else {
        // Connect directly to head location
        sourceId = headLocation.key;
      }

      const branchEdgeData = {
        id: `edge-${edgeId++}`,
        source: sourceId,
        target: branch.key,
        type: 'default', // Changed to 'default'
        style: { stroke: '#52c41a', strokeWidth: 3 }, // Different color for branch connections
        animated: false,
      };
      edges.push(branchEdgeData);

      // Branch employees (rectangles)
      branch.employees.forEach((emp, idx) => {
        const empId = `${branch.key}-emp-${idx}`;
        nodes.push({
          id: empId,
          type: 'employee',
          data: {
            type: 'employee',
            id: empId,
            label: emp.name,
            position: emp.position,
            department: emp.department,
            avatar: emp.avatar,
          },
          position: { x: 0, y: 0 },
        });

        const empEdgeData = {
          id: `edge-${edgeId++}`,
          source: branch.key,
          target: empId,
          type: 'default', // Changed to 'default'
          style: { stroke: '#52c41a', strokeWidth: 3 }, // Branch employee connections
          animated: false,
        };
        edges.push(empEdgeData);
      });
    });

    // Layout - now returns both nodes and edges
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(nodes, edges, 'TB');

    return { nodes: layoutedNodes, edges: layoutedEdges };
  }, [locations]);

  if (!locations || locations.length === 0) {
    return (
      <Card>
        <Empty
          description={resourceHelpers.getUserManagementText('ORGANIZATIONAL_CHART.NO_DATA')}
        />
      </Card>
    );
  }

  return (
    <Card>
      <Title level={4}>{resourceHelpers.getUserManagementText('ORGANIZATIONAL_CHART.TITLE')}</Title>
      <Text type="secondary" style={{ display: 'block', marginBottom: 24 }}>
        {resourceHelpers.getUserManagementText('ORGANIZATIONAL_CHART.SUBTITLE')}
      </Text>

      <div style={{ width: '100%', height: 700 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          fitView
          attributionPosition="top-right"
          fitViewOptions={{ padding: 0.2 }}
          panOnDrag={true}
          zoomOnScroll={true}
          proOptions={{ hideAttribution: true }}
          defaultEdgeOptions={{
            style: {
              strokeWidth: 5,
              stroke: '#ff0000' /* Bright red for maximum visibility */,
            },
            type: 'default',
          }}
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>
    </Card>
  );
};

export default OrganizationalChart;
