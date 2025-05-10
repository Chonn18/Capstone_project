import React, { useEffect, useState } from 'react';
import { fetchGraphData } from '../../service/neo4jService';
import { Graph } from 'react-d3-graph';

const GraphComponent = () => {
  const [graphData, setGraphData] = useState({ nodes: [], links: [] });

  useEffect(() => {
    const getData = async () => {
      const data = await fetchGraphData();
      setGraphData(data);
    };
    getData();
  }, []);

  const config = {
    nodeHighlightBehavior: true,
    node: { color: 'lightblue', size: 400, highlightStrokeColor: 'blue' },
    link: { highlightColor: 'blue' },
    directed: true,
  };

  return <Graph id="graph-id" data={graphData} config={config} />;
};

export default GraphComponent;
