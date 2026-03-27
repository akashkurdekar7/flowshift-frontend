import React from 'react'

const Result =  ({isOpen, onClose, results})  => {
 if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3 className="modal-title">Pipeline Analysis</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <div className="result-item">
            <span className="result-label">Total Nodes:</span>
            <span className="result-value">{results.num_nodes}</span>
          </div>
          <div className="result-item">
            <span className="result-label">Total Edges:</span>
            <span className="result-value">{results.num_edges}</span>
          </div>
          <div className="result-item">
            <span className="result-label">DAG Validated:</span>
            <span
              className={`result-value ${results.is_dag ? "status-pass" : "status-fail"}`}>
              {results.is_dag
                ? "✓ Passed (No Cycles)"
                : "✗ Failed (Cycles Detected)"}
            </span>
          </div>

          <div className="execution-container">
            <h4 className="execution-title">Execution Output:</h4>
            <div className="execution-result">
              {results.executionResult
                ? results.executionResult
                : "No output node connected"}
            </div>
          </div>

          {results.error && <div className="result-error">{results.error}</div>}
        </div>
        <div className="modal-footer">
          <button className="modal-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Result
