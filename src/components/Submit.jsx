import {useState} from "react";
import {useStore} from "./Store";
import {toast} from "react-toastify";

const Submit = ({onResult}) => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    const hasOutput = nodes.some((n) => n.type === "customOutput");

    if (!hasOutput) {
      toast.warn("Add at least one Output node");
      return;
    }
    // ✅ Empty state validation
    if (edges.length === 0) {
      toast.warn("Connect nodes to run pipeline");
      return;
    }

    setIsLoading(true);
    try {
      const parseResponse = await fetch(
        "https://flowshift-backend.onrender.com/pipelines/parse",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({nodes, edges}),
        },
      );

      // 2. Run Execution
      const runResponse = await fetch(
        "https://flowshift-backend.onrender.com/pipelines/run",
        {
          method: "POST",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({nodes, edges}),
        },
      );

      if (!parseResponse.ok || !runResponse.ok) {
        throw new Error("Network response was not ok");
      }

      const parseResult = await parseResponse.json();
      const runResult = await runResponse.json();

      // Filter for output nodes only
      const outputNodes = nodes.filter(
        (node) => node.type === "customOutput" || node.type === "output",
      );

      const executionOutput =
        outputNodes.length > 0
          ? outputNodes
              .map((node, index) => {
                const val = runResult.results?.[node.id];
                const label =
                  node.data?.outputName ||
                  (outputNodes.length > 1 ? `Output ${index + 1}` : "Output");
                return val !== undefined ? `${label}: ${val}` : null;
              })
              .filter((v) => v !== null)
              .join("\n")
          : "";

      // Consolidate results
      const finalResult = {
        ...parseResult,
        executionResult: executionOutput,
      };

      // Add a slight delay for better UX (so users see the "Running..." state)
      await new Promise((resolve) => setTimeout(resolve, 800));

      if (onResult) {
        onResult(finalResult);
      }
    } catch (error) {
      console.error("Error submitting pipeline:", error);
      toast.error(
        "Error submitting pipeline. Please ensure the backend server is running.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button className="submit-btn" onClick={handleSubmit} disabled={isLoading}>
      {isLoading ? (
        <>
          <span className="spinner"></span>
          Running...
        </>
      ) : (
        "Submit Pipeline"
      )}
    </button>
  );
};

export default Submit;
