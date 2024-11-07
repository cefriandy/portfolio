import { useState, useEffect, ChangeEvent } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-modal';
import './style.css';

interface TableData {
  data: any[];
  table_id: string;
}

interface EditData {
  idRow: string;
  [key: string]: string;
}

interface Errors {
  rowCount?: string; // Optional string for row count error
  columnCount?: string; // Optional string for column count error
  [key: string]: string | undefined; // Allow for dynamic keys for column errors
}

function DynamicTable() {
  const [columns, setColumns] = useState<string[]>([]);
  const [rows, setRows] = useState<string[][]>([]);
  const [rowCount, setRowCount] = useState(0);
  const [columnCount, setColumnCount] = useState(0);

  const [tableData, setTableData] = useState<TableData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [userId, setUserId] = useState('12345678');
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [showForm, setShowForm] = useState(false);
  const [editRow, setEditRow] = useState<number | string | null>(null);
  const [editData, setEditData] = useState<EditData>({ idRow: '' });
  const [successMessage, setSuccessMessage] = useState('');


  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8090/api/v1/table/${userId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTableData(data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('An unknown error occurred'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { data, table_id } = tableData || {};
  const cols = data && data.length > 0 ? Object.keys(data[0]) : [];

  const handlePrev = () => {
    setCurrentStep((prevStep) => prevStep - 1);
  };

  const validateCurrentStep = () => {
    let newErrors: Record<string, string> = {}; // Define newErrors as a record

    if (currentStep === 0) {
      if (!rowCount || rowCount < 1) {
        newErrors.rowCount = 'Number of rows is required and must be at least 1';
      }
      if (!columnCount || columnCount < 1) {
        newErrors.columnCount = 'Number of columns is required and must be at least 1';
      }
    } else if (currentStep === 1) {
      const columnNames = Array.from({ length: columnCount }, (_, index) => {
        const element = document.getElementById(`column${index}`) as HTMLInputElement;
        return element ? element.value : '';
      });
      columnNames.forEach((name, index) => {
        if (!name) {
          newErrors[`column${index}`] = `Column ${index + 1} is required`;
        }
      });
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSetupSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      setCurrentStep(1);
    }
  };

  const handleColumnSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (validateCurrentStep()) {
      const columnNames = Array.from({ length: columnCount }, (_, index) => {
        const element = document.getElementById(`column${index}`) as HTMLInputElement; // Cast to HTMLInputElement
        return element ? element.value : ''; // Safely access the value
      });
      setColumns(columnNames);

      const initialRows = Array.from({ length: rowCount }, () => Array(columnCount).fill(''));
      setRows(initialRows);

      setCurrentStep(2);
    }
  };

  const handleRowChange = (e: ChangeEvent<HTMLInputElement>, rowIndex: number, columnIndex: number) => {
    const updatedRows = rows.map((row, rIdx) => {
      if (rIdx === rowIndex) {
        const updatedRow = [...row];
        updatedRow[columnIndex] = e.target.value;
        return updatedRow;
      }
      return row;
    });
    setRows(updatedRows);
  };

  const handleFormSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setLoading(true);

    const formData = {
      userId,
      columns,
      rows,
    };

    try {
      const response = await fetch('http://localhost:8090/api/v1/table/save-all', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.ok) {
        setUserId('12345678');
        fetchData();
        setColumnCount(0);
        setRowCount(0);
        setCurrentStep(0);
        setShowForm(false);
        setSuccessMessage('Created Successfully');


        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);

      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };


  const handleEdit = (rowIndex: number | null) => {
    if (data && rowIndex !== null) { // Check if data is defined and rowIndex is not null
      const rowData = data[rowIndex];
      setEditRow(rowIndex);
      setEditData(rowData);
    }
  };

  const handleDelete = async (rowIndex: number) => {
    if (data) {
      const rowToDelete = data[rowIndex];
      const { idRow } = rowToDelete;

      setLoading(true);

      try {
        const response = await fetch(`http://localhost:8090/api/v1/table/delete?userId=${userId}&tableId=${table_id}&idRow=${idRow}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        fetchData(); // Fetch data after deletion
        console.log('Row deleted successfully');
      } catch (error) {
        console.error('Error deleting row:', error);
      } finally {
        setLoading(false);
      }
    }
  };


  const handleCreateClick = () => {
    setShowForm(true);
    setCurrentStep(0);
  };

  const handleEditChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setLoading(true);

    const { idRow, ...payload } = editData;

    try {
      const response = await fetch(`http://localhost:8090/api/v1/table/edit?userId=${userId}&tableId=${table_id}&idRow=${idRow}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.ok) {
        fetchData();
        console.log('Row edited successfully');
      }
    } catch (error) {
      console.error('Error editing row:', error);
    } finally {
      setLoading(false);
      setEditRow(null);
    }
  };

  const handleAddRow = () => {
    const newEditData: EditData = columns.reduce((acc: EditData, column) => {
      acc[column] = '';
      return acc;
    }, { idRow: '' });

    setEditData(newEditData);
    setEditRow('new');
  };


  const handleAddSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    setLoading(true);

    const newRow = {
      ...editData,
    };

    try {

      const body = {
        userId,
        data: {
          ...newRow
        }
      }

      const response = await fetch('http://localhost:8090/api/v1/table/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (response.ok) {
        fetchData();
        console.log('Row added successfully');
        setSuccessMessage('Row added successfully!'); // Inform the user

        // Hide success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage('');
        }, 3000);

        setEditRow(null);
      }
    } catch (error) {
      console.error('Error adding row:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      {loading && <div className="spinner-border text-primary" role="status"><span className="sr-only">Loading...</span></div>}

      {!showForm && <button className="btn btn-primary mb-4" onClick={handleCreateClick}>Generate Dynamic Table Content</button>}

      {showForm && (
        <form onSubmit={currentStep === 2 ? handleFormSubmit : (e) => e.preventDefault()} className="mb-4">
          {currentStep === 0 && (
            <>
              <div className="form-group">
                <label htmlFor="rowCount">Number Of Rows:</label>
                <input
                  type="number"
                  id="rowCount"
                  className="form-control"
                  value={rowCount}
                  onChange={(e) => setRowCount(Number(e.target.value))}
                  min="1"
                  required
                />
                {errors.rowCount && <small className="text-danger">{errors.rowCount}</small>}
              </div>
              <div className="form-group">
                <label htmlFor="columnCount">Number Of Columns:</label>
                <input
                  type="number"
                  id="columnCount"
                  className="form-control"
                  value={columnCount}
                  onChange={(e) => setColumnCount(Number(e.target.value))}
                  min="1"
                  required
                />
                {errors.columnCount && <small className="text-danger">{errors.columnCount}</small>}
              </div>
              <button type="button" className="btn btn-primary" onClick={handleSetupSubmit}>Next</button>
            </>
          )}

          {currentStep === 1 && (
            <>
              {Array.from({ length: columnCount }, (_, index) => (
                <div key={index} className="form-group">
                  <label htmlFor={`column${index}`}>Column {index + 1}:</label>
                  <input type="text" id={`column${index}`} className="form-control" required />
                  {errors[`column${index}`] && <small className="text-danger">{errors[`column${index}`]}</small>}
                </div>
              ))}
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={handlePrev}>Previous</button>
                <button type="button" className="btn btn-primary" onClick={handleColumnSubmit}>Next</button>
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div className="row">
                {rows.map((row, rowIndex) => (
                  <div key={rowIndex} className="col-md-6 col-lg-4 mb-4">
                    <h4>Section {rowIndex + 1}</h4>
                    <div className="form-row mb-2">
                      {columns.map((column, columnIndex) => (
                        <div key={columnIndex} className="col">
                          <input
                            type="text"
                            className="form-control"
                            placeholder={`${column} Row ${rowIndex + 1}`}
                            value={row[columnIndex]}
                            onChange={(e) => handleRowChange(e, rowIndex, columnIndex)}
                            required
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={handlePrev}>Previous</button>
                <button type="submit" className="btn btn-primary">Submit</button>
              </div>
            </>
          )}
        </form>
      )}

      {successMessage && (
        <div className="alert alert-success" role="alert">
          {successMessage}
        </div>
      )}

      <div className="container mt-5">
        {table_id ? (
          <>
            <h2 className="mb-4">Table ID: {table_id}</h2>
            <div className="d-flex justify-content-end align-items-center mb-2">
              <button className="btn btn-success" onClick={handleAddRow}>Add Row</button>
            </div>

            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  {cols.map((column) => (
                    <th key={column}>{column}</th>
                  ))}
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody key={table_id}>
                {data?.map((row, rowIndex) => (
                  <tr key={row.id}>
                    {cols.map((column) => (
                      <td key={column}>{row[column]}</td>
                    ))}
                    <td>
                      <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEdit(rowIndex)}>Edit</button>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(rowIndex)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <p className="text-center">No data available</p>
        )}
      </div>
      <Modal isOpen={editRow !== null} onRequestClose={() => setEditRow(null)}>
        <h2>{editRow === 'new' ? 'Add Row' : 'Edit Row'}</h2>
        <form onSubmit={editRow === 'new' ? handleAddSubmit : handleEditSubmit}>
          {editRow !== 'new' && (
            <div className="form-group">
              <label htmlFor="idRow">idRow</label>
              <input
                type="text"
                id="idRow"
                name="idRow"
                className="form-control"
                value={editData.idRow || ''}
                readOnly
                style={{ backgroundColor: '#e9ecef' }}
              />
            </div>
          )}
          {cols.map((column) => (
            column !== 'idRow' && (
              <div key={column} className="form-group">
                <label htmlFor={column}>{column}</label>
                <input
                  type="text"
                  id={column}
                  name={column}
                  className="form-control"
                  value={editData[column] || ''}
                  onChange={handleEditChange}
                  required
                />
              </div>
            )
          ))}
          <button type="submit" className="btn btn-primary">{editRow === 'new' ? 'Add' : 'Save'}</button>
          <button type="button" className="btn btn-secondary" onClick={() => setEditRow(null)}>Cancel</button>
        </form>
      </Modal>
    </div>
  );
}

export default DynamicTable;
