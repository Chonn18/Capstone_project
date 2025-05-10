import React, { useEffect, useRef, useState } from "react";
import API from "../../API";
import { default as VisGraph } from "react-vis-network-graph";

const transformDataToVisNetwork = (data, type) => {
    const nodes = [];
    const edges = [];

    data.forEach((record) => {
        // handle node case
        if (type === "label") {
            const { labels, properties } = record;
            if (labels && properties) {
                const nodeId = properties.id || Math.random(); // Fallback to a random ID if `id` is missing

                // Add node if it doesn’t exist
                if (!nodes.some((node) => node.id === nodeId)) {
                    nodes.push({
                        id: nodeId,
                        label: properties.name || properties.fileName || "Unnamed", // Use 'Unnamed' if name is missing
                        group: labels[0] || "Unknown", // Use first label as group, fallback to 'Unknown'
                        title:
                            properties.description ||
                            "No description available", // Fallback for missing description
                    });
                }
            }
        } else {
            // handle relationship case
            const {
                startNodeLabels,
                startNodeProperties,
                relationshipType,
                endNodeLabels,
                endNodeProperties,
            } = record;

            // Extract unique node IDs and properties
            const startNodeId = startNodeProperties?.id;
            const endNodeId = endNodeProperties?.id;

            // Add start node
            if (!nodes.some((node) => node.id === startNodeId)) {
                nodes.push({
                    id: startNodeId,
                    label: startNodeProperties.name || startNodeProperties.fileName || "Unnamed", // Customize to display other properties if needed
                    group: startNodeLabels[0] || "Unknown", // Use first label as group (customize as needed)
                    title:
                        startNodeProperties.description ||
                        "No description available", // Hover text (optional)
                });
            }
            // Add end node
            if (!nodes.some((node) => node.id === endNodeId)) {
                nodes.push({
                    id: endNodeId,
                    label: endNodeProperties.name || endNodeProperties.fileName || "Unnamed", // Customize as above
                    group: endNodeLabels[0] || "Unknown",
                    title:
                        endNodeProperties.description ||
                        "No Description available",
                });
            }
            // Add edge
            edges.push({
                from: startNodeId,
                to: endNodeId,
                label: relationshipType || "No Type", // Relationship type as label on edge
                arrows: "to", // Arrow direction (from -> to)
            });
        }
    });

    return { nodes, edges };
};

const Graph = ({ cypher, type }) => {
    const [graphData, setGraphData] = useState({ nodes: [], edges: [] });

    const options = {
        layout: {
            hierarchical: false,
        },
        edges: {
            color: "#000000",
            arrows: {
                to: { enabled: true, scaleFactor: 1 },
            },
        },
        nodes: {
            shape: "dot",
            size: 16,
        },
        physics: {
            enabled: true, // Cho phép hiệu ứng physics
        },
    };
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await API.post("/neo4j/run-query", {
                    query: cypher,
                });
                if (response.status === 200) {
                    // console.log(type)
                    // console.log(response.data)
                    const transformedData = transformDataToVisNetwork(
                        response.data,
                        type
                    );
                    setGraphData(transformedData);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (cypher) fetchData();
    }, [cypher, type]);
    return (
        <div className="w-full h-full">
            <VisGraph
                graph={graphData}
                options={options}
                style={{ height: "100%" }}
            />
        </div>
    );
};

export default Graph;
