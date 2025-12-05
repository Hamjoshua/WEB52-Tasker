import React, { useState, useEffect } from 'react'


export default function PopupConfirm({ message, onConfirm, onCancel }) {
    return (
        <div className="alert" onClick={onCancel}>
            <div class="task-delete popup">
                <span className="title">{message}</span>
                <div className="task-info-buttons">
                    <button onClick={onConfirm} className="btn-text yes">Yes</button>
                    <button onClick={onCancel} className="btn-text no">No</button>
                </div>
            </div>
        </div>
    )
}