import React from 'react'

export default function Alert(props) {
    return (
        <>
            <div className={`alert alert-${props.alertType}`} style={{'textAlign':'center','fontSize':'16px','fontWeight':'14px'}} role="alert">
                <strong><i className="bi bi-arrow-right-circle-fill mx-2"></i>{props.alertMessage}</strong>
            </div>
        </>
    )
}
