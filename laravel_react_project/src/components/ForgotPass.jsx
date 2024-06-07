import React from "react";

const ForgotPass = () => {
    return (
        <div>
            <form>
                <div className="mb-3">
                    <label for="exampleInputEmail1" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text"></div>
                </div>
                <div className="container">
                    <div className="row">
                        <div className="col align-self-start">
                            <button type="submit" className="btn btn-secondary">Back</button>
                        </div>
                        <div className="col align-self-end">
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
export default ForgotPass;