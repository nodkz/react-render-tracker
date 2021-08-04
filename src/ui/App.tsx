import React, { useState, useMemo } from "react";

import { getTreeData, handleFilterDataElement } from "./data/helpers";
import { MessageElement } from "./types";

import TreeElement from "./components/TreeElement";
import ElementInfo from "./components/element/ElementInfo";
import Card from "./components/ui/Card";
import ToolsHeader from "./components/layout/ToolsHeader";

function App({ data }: { data: MessageElement[] }) {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [filterPattern, setFilterPattern] = useState("");
  const [groupByParent, setGroupByParent] = useState(false);
  const [showUnmounted, setShowUnmounted] = useState(true);

  const { componentById, roots } = useMemo(
    () => getTreeData(data || [], groupByParent),
    [data, groupByParent]
  );
  const filteredData = useMemo(
    () => handleFilterDataElement(roots, filterPattern, showUnmounted),
    [roots, filterPattern, showUnmounted]
  );
  const selectedComponent = componentById.get(selectedId) || null;

  return (
    <div className="App">
      <ToolsHeader
        onFilterPatternChange={setFilterPattern}
        filterPattern={filterPattern}
        onGroupingChange={setGroupByParent}
        groupByParent={groupByParent}
        onShowUnmounted={setShowUnmounted}
        showUnmounted={showUnmounted}
      />
      <div className="tools-content">
        <div>
          <Card>
            {filteredData?.map(rootElement => (
              <TreeElement
                data={rootElement}
                onSelect={setSelectedId}
                selectedId={selectedId}
                key={rootElement.id}
                highlight={filterPattern.toLowerCase()}
                root
              />
            ))}
          </Card>
        </div>
        {selectedComponent && <ElementInfo data={selectedComponent} />}
      </div>
    </div>
  );
}

export default App;