import styled from "styled-components";

export const TableContainer = styled.table`
    max-width: 95%;
    border-collapse: collapse;
    border-spacing: 0;
    border: 1px solid #ddd;
    margin-bottom: 20px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    overflow: auto;
    font-size: 0.875em;
    & thead {
        background-color: #374151;
        color: #fff;
        & th {
            text-align: center;
        }
    }
    & th, td {
        padding: 12px 15px;
        text-align: left;
        border: 1px solid #ddd;
    }
`
