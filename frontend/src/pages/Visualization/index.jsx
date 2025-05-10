import React, { useEffect, useMemo, useState } from "react";
import Graph from "../../components/Graph";
import API from "../../API";
import { Tag, Divider } from "antd";

const Visualization = () => {
    const [labels, setLabels] = useState([]);
    const [relationships, setRelationships] = useState([]);
    const [selectedLabel, setSelectedLabel] = useState(null);
    const [selectedRelationship, setSelectedRelationship] = useState(null);
    const [cypher, setCypher] = useState("");
    const [type, setType] = useState("")

    const memoizedLabels = useMemo(() => labels, [labels]);
    const memoizedRelationships = useMemo(() => relationships, [relationships]);

    useEffect(() => {
        const fetchLabels = async () => {
            try {
                const response = await API.get("/neo4j/all-labels");
                if (response.status === 200) {
                    setLabels(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        const fetchRelationships = async () => {
            try {
                const response = await API.get("/neo4j/all-relationships");
                if (response.status === 200) {
                    setRelationships(response.data);
                }
            } catch (error) {
                console.error(error);
            }
        };
        if (labels.length === 0) fetchLabels();
        if (relationships.length === 0) fetchRelationships();
    }, [labels, relationships]);

    const handleOnClickLabel = (label) => {
        setSelectedLabel((prevLabel) => (prevLabel === label ? null : label));
        setSelectedRelationship(null);
        const query = `MATCH (n:${label})
                        RETURN labels(n) AS labels, n {.*} AS properties
                        LIMIT 25`       
        setCypher(query);
        setType("label")
    };

    const handleOnClickRelationship = (relationship) => {
        setSelectedRelationship((prevRelationship) =>
            prevRelationship === relationship ? null : relationship
        );
        setSelectedLabel(null);
        const query = `MATCH (startNode)-[r:${relationship}]->(endNode)
                        RETURN labels(startNode) AS startNodeLabels, 
                              startNode { .*, id: id(startNode) } AS startNodeProperties,
                              type(r) AS relationshipType,
                              labels(endNode) AS endNodeLabels,
                              endNode { .*, id: id(endNode) } AS endNodeProperties
                        LIMIT 25
                        `;
        setCypher(query);
        setType('relationship')
    };

    return (
        <div className="h-full w-full flex">
            <div className="w-1/3">
                <div className="border shadow-md rounded-lg mx-6 mb-0 h-1/2 overflow-y-auto">
                    {/* <h2 className="text-sm font-semibold">Nodes :</h2> */}
                    <Divider className="" orientation="left">
                        Nodes :
                    </Divider>
                    <div className="ml-2 mb-2">
                        {memoizedLabels.map((label, index) => (
                            <Tag
                                key={index}
                                color=""
                                className={`m-1 cursor-pointer border text-[#d4380d] border-[#ffbb96] ${
                                    selectedLabel === label
                                        ? "bg-[#ffbb96]"
                                        : "bg-[#fff2e8] "
                                } `}
                                onClick={() => handleOnClickLabel(label)}
                            >
                                {label}
                            </Tag>
                        ))}
                    </div>
                </div>
                <div className="border shadow-md rounded-lg mx-6 h-1/2 overflow-y-auto">
                    {/* <h2 className="text-sm font-semibold">Nodes :</h2> */}
                    <Divider className="" orientation="left">
                        Relationships :
                    </Divider>
                    <div className="ml-2 mb-2">
                        {memoizedRelationships.map((relationship, index) => (
                            <Tag
                                key={index}
                                color=""
                                className={`m-1 cursor-pointer border text-[#0958d9] border-[#91caff] ${
                                    selectedRelationship === relationship
                                        ? "bg-[#91caff]"
                                        : "bg-[#e6f4ff] "
                                } `}
                                onClick={() =>
                                    handleOnClickRelationship(relationship)
                                }
                            >
                                {relationship}
                            </Tag>
                        ))}
                    </div>
                </div>
            </div>
            <div className="w-2/3">
                <Graph cypher={cypher} type={type}/>
            </div>
        </div>
    );
};

export default Visualization;
