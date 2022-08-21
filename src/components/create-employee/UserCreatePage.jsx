import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import * as api from "../../api/Api";
import moment from "moment"

export default function UserCreatePage() {
    const initialState = Object.freeze({
        username: "",
        password: "",
        role: "",
    });
    const initialOfficeTime = Object.freeze({
        6: { starts: 0, ends: 0 },
        0: { starts: 0, ends: 0 },
        1: { starts: 0, ends: 0 },
        2: { starts: 0, ends: 0 },
        3: { starts: 0, ends: 0 },
        4: { starts: 0, ends: 0 },
        5: { starts: 0, ends: 0 },
    });
    const initialLeave = [
        {
            leave_id: parseInt(process.env.REACT_APP_LEAVE_CASUAL),
            leave_type: "Casual",
            leave_balance: 0,
            leave_taken: 0,
        },
        {
            leave_id: parseInt(process.env.REACT_APP_LEAVE_SICK),
            leave_type: "Sick",
            leave_balance: 0,
            leave_taken: 0,
        },
        {
            leave_id: parseInt(process.env.REACT_APP_LEAVE_ANNUAL),
            leave_type: "Annual",
            leave_balance: 0,
            leave_taken: 0,
        },
        {
            leave_id: parseInt(process.env.REACT_APP_LEAVE_HOLIDAY),
            leave_type: "Holiday",
            leave_balance: 0,
            leave_taken: 0,
        },
    ];
    const initialWorkingDays = Object.freeze({
        6: false,
        1: false,
        2: false,
        3: false,
        4: false,
        5: false,
    });
    const weekDays = [
        {
            name: "Saturday",
            key: 6,
        },
        {
            name: "Sunday",
            key: 0,
        },
        {
            name: "Monday",
            key: 1,
        },
        {
            name: "Tuesday",
            key: 2,
        },
        {
            name: "Wednesday",
            key: 3,
        },
        {
            name: "Thursday",
            key: 4,
        },
        {
            name: "Friday",
            key: 5,
        },
    ];

    const [details, setDetails] = useState(initialState);
    const [isDisable, setIsDisable] = useState(false);
    const [workingDays, setWorkingDays] = useState(initialWorkingDays);
    const [chooseDepartment, setChooseDepartment] = useState("")
    const [departments, setDepartments] = useState([]);
    // office time type: common & custom
    const [officeTimeType, setOfficeTimeType] = useState("common");
    const [officeTime, setOfficeTime] = useState(initialOfficeTime);
    // leave type: static & custom
    const [leaveType, setLeaveType] = useState("static");
    const [leavePolicy, setLeavePolicy] = useState([]);
    const [leaves, setLeaves] = useState(initialLeave);

    const fetchDepartments = async () => {
        const depts = await api.departmentList()
        setDepartments(depts);
    }

    useEffect(
        () => {
            fetchDepartments()

            setLeavePolicy([
                {
                    name: "General 1",
                    policy: [
                        {
                            leave_id: parseInt(
                                process.env.REACT_APP_LEAVE_CASUAL
                            ),
                            leave_type: "Casual",
                            leave_balance: 10,
                        },
                        {
                            leave_id: parseInt(
                                process.env.REACT_APP_LEAVE_SICK
                            ),
                            leave_type: "Sick",
                            leave_balance: 14,
                        },
                        {
                            leave_id: parseInt(
                                process.env.REACT_APP_LEAVE_ANNUAL
                            ),
                            leave_type: "Annual",
                            leave_balance: 15,
                        },
                        {
                            leave_id: parseInt(
                                process.env.REACT_APP_LEAVE_HOLIDAY
                            ),
                            leave_type: "Holiday",
                            leave_balance: 11,
                        },
                    ],
                },
                {
                    name: "General 2",
                    policy: [
                        {
                            leave_id: parseInt(
                                process.env.REACT_APP_LEAVE_CASUAL
                            ),
                            leave_type: "Casual",
                            leave_balance: 18,
                        },
                        {
                            leave_id: parseInt(
                                process.env.REACT_APP_LEAVE_SICK
                            ),
                            leave_type: "Sick",
                            leave_balance: 10,
                        },
                        {
                            leave_id: parseInt(
                                process.env.REACT_APP_LEAVE_ANNUAL
                            ),
                            leave_type: "Annual",
                            leave_balance: 7,
                        },
                        {
                            leave_id: parseInt(
                                process.env.REACT_APP_LEAVE_HOLIDAY
                            ),
                            leave_type: "Holiday",
                            leave_balance: 14,
                        },
                    ],
                },
            ]);
        },
        // eslint-disable-next-line
        []
    );

    const handleChange = (e) => {
        if (e.target.name === "role" || e.target.name === "dayoff") {
            setDetails((prev) => ({
                ...prev,
                [e.target.name]: parseInt(e.target.value),
            }));
        } else {
            setDetails((prev) => ({
                ...prev,
                [e.target.name]: e.target.value,
            }));
        }
    };

    const handleWorkingDays = (e) => {
        setWorkingDays((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.checked,
        }));
    };

    const handleDepartmentChange = (e) => {
        const chosenDept = departments.find(each => 
            each.dept_id === parseInt(e.target.value))
        
        setChooseDepartment({
            id: chosenDept.dept_id,
            name: chosenDept.dept_name
        })
    }

    const handleLeaveType = (e) => {
        setLeaveType(e.target.value);
    };

    const handleOfficeTime = (e) => {
        const date = new Date();
        date.setHours(e.target.value.split(":")[0]);
        date.setMinutes(e.target.value.split(":")[1]);
        date.setSeconds(0);

        if (officeTimeType === "custom") {
            setOfficeTime((curState) => ({
                ...curState,
                [parseInt(e.target.dataset.key)]: {
                    ...curState[e.target.dataset.key],
                    [e.target.dataset.when]: moment(date).format("hh:mm A"),
                },
            }));
        }

        if (officeTimeType === "common") {
            for (let each of weekDays) {
                setOfficeTime((curState) => ({
                    ...curState,
                    [parseInt(each.key)]: {
                        ...curState[each.key],
                        [e.target.dataset.when]: moment(date).format("hh:mm A"),
                    },
                }));
            }
        }
    };

    const handleLeave = (leave_index, leave_id, leave_type, leave_balance) => {
        const updateState = [...leaves];

        updateState[leave_index].leave_id = parseInt(leave_id);
        updateState[leave_index].leave_type = leave_type;
        updateState[leave_index].leave_balance = parseInt(leave_balance);
        updateState[leave_index].leave_taken = 0;

        setLeaves(updateState);
    };

    const handleLeavePolicy = (e) => {
        if (e.target.selectedOptions[0].value === "") {
            setLeaves(initialLeave);
        } else {
            setLeaves(leavePolicy[e.target.selectedOptions[0].value].policy);
        }
    };

    const handleSubmit = async () => {
        const errors = [null, undefined, ""]
        if (
            errors.includes(details.username) ||
            errors.includes(details.password) ||
            errors.includes(details.role)
        ) {
            toast.dismiss()
			return toast.error("All fields are required", {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }

        setIsDisable(true)

        let dayOff = [];

        Object.keys(workingDays).map((each) => {
            if (workingDays[each] === false) {
                dayOff.push(parseInt(each));
            }
            return 0;
        });

        const payload = {
            user_name: details.username,
            password: details.password,
            role: [details.role],
            dayoff: dayOff,
            office_time: officeTime,
            leaves: leaves,
            department: chooseDepartment
        };

        console.log(payload);

        // const res = await api.register(payload);
        
        // if(res.flag === 'SUCCESS'){
        //     toast.dismiss()
        //     toast.success(res.message, {
        //         position: "top-center",
        //         autoClose: 2000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // } else if(res.flag === 'FAIL'){
        //     toast.dismiss()
        //     toast.error(res.message, {
        //         position: "top-center",
        //         autoClose: 2000,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //     });
        // }

        setIsDisable(false)
    };

    return (
        <>
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <div>
                <h3>User Create Page</h3>
            </div>
            <input
                type="text"
                autoComplete="off"
                placeholder="Username"
                name="username"
                value={details.username}
                onChange={handleChange}
            />
            <input
                type="password"
                placeholder="Password"
                name="password"
                value={details.password}
                onChange={handleChange}
            />
            <select
                name="role"
                id="role"
                value={details.role}
                onChange={handleChange}
            >
                <option defaultValue="">Select User Role</option>
                <option value={process.env.REACT_APP_ROLE_USER}>User</option>
                <option value={process.env.REACT_APP_ROLE_ADMIN}>Admin</option>
            </select>

            <div>
                <h3>Working Day</h3>
            </div>
            <div>
                {weekDays.map((each) => (
                    <span key={each.key}>
                        <input
                            type="checkbox"
                            name={each.key}
                            id={each.key}
                            onChange={handleWorkingDays}
                        />
                        <label htmlFor={each.key}>{each.name}</label>
                    </span>
                ))}
            </div>

            <div>
                <h3>Department</h3>
            </div>
            <div>
                <select
                    name="dept"
                    id="dept"
                    value={chooseDepartment}
                    onChange={handleDepartmentChange}
                >
                    <option defaultValue="">Select Department</option>
                    {departments.map((each, index) => (
                        <option key={index} value={each.dept_id}>{ each.dept_name }</option>
                    ))}
                </select>
            </div>

            <div>
                <h3>Office Time</h3>
            </div>

            <div>
                <label htmlFor="office-time">
                    <input
                        type="radio"
                        name="office-time"
                        id="office-time"
                        value="common"
                        checked={officeTimeType === "common"}
                        onChange={(e) => setOfficeTimeType(e.target.value)}
                    />
                    Common
                </label>
                <label htmlFor="office-time-2">
                    <input
                        type="radio"
                        name="office-time"
                        id="office-time-2"
                        value="custom"
                        checked={officeTimeType === "custom"}
                        onChange={(e) => setOfficeTimeType(e.target.value)}
                    />
                    Custom
                </label>
            </div>

            {officeTimeType === "common" && (
                <>
                    <input
                        type="time"
                        data-key="common"
                        data-when="starts"
                        onChange={handleOfficeTime}
                    />
                    <span> - </span>
                    <input
                        type="time"
                        data-key="common"
                        data-when="ends"
                        onChange={handleOfficeTime}
                    />
                </>
            )}

            {officeTimeType === "custom" &&
                weekDays.map((each, index) => (
                    <div key={index}>
                        <label htmlFor="day">{each.name}</label>

                        <input
                            type="time"
                            data-key={each.key}
                            data-when="starts"
                            onChange={handleOfficeTime}
                        />
                        <span> - </span>
                        <input
                            type="time"
                            data-key={each.key}
                            data-when="ends"
                            onChange={handleOfficeTime}
                        />
                    </div>
                ))}

            <div>
                <h3>Leave Balance</h3>

                <div>
                    <label htmlFor="leave-type">
                        <input
                            type="radio"
                            name="leave-type"
                            id="leave-type"
                            value="static"
                            checked={leaveType === "static"}
                            onChange={handleLeaveType}
                        />
                        Static
                    </label>

                    <input
                        type="radio"
                        name="leave-type"
                        id="leave-type-2"
                        value="custom"
                        checked={leaveType === "custom"}
                        onChange={handleLeaveType}
                    />
                    <label htmlFor="leave-type-2">Custom</label>
                </div>

                {leaveType === "static" && (
                    <div>
                        <label htmlFor="leave-policy">Leave Policy</label>
                        <select
                            name="lave-policy"
                            id="leave-policy"
                            onChange={handleLeavePolicy}
                        >
                            <option value="">Select One</option>

                            {leavePolicy.map((each, index) => (
                                <option key={index} value={index}>
                                    {each.name}
                                </option>
                            ))}
                        </select>
                        {(leavePolicy !== "" || leavePolicy !== []) && (
                            <>
                                <div>
                                    <label htmlFor="casual-leave">
                                        Casual Leave
                                    </label>
                                    <input
                                        type="number"
                                        disabled
                                        value={leaves[0].leave_balance}
                                        onChange={(e) =>
                                            handleLeave(
                                                0,
                                                process.env
                                                    .REACT_APP_LEAVE_CASUAL,
                                                "Casual",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label htmlFor="sick-leave">
                                        Sick Leave
                                    </label>
                                    <input
                                        type="number"
                                        disabled
                                        value={leaves[1].leave_balance}
                                        onChange={(e) =>
                                            handleLeave(
                                                1,
                                                process.env
                                                    .REACT_APP_LEAVE_SICK,
                                                "Sick",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label htmlFor="annual-leave">
                                        Annual Leave
                                    </label>
                                    <input
                                        type="number"
                                        disabled
                                        value={leaves[2].leave_balance}
                                        onChange={(e) =>
                                            handleLeave(
                                                2,
                                                process.env
                                                    .REACT_APP_LEAVE_ANNUAL,
                                                "Annual",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>

                                <div>
                                    <label htmlFor="holiday">
                                        Govt. Holiday
                                    </label>
                                    <input
                                        type="number"
                                        disabled
                                        value={leaves[3].leave_balance}
                                        onChange={(e) =>
                                            handleLeave(
                                                3,
                                                process.env
                                                    .REACT_APP_LEAVE_HOLIDAY,
                                                "Holiday",
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                            </>
                        )}
                    </div>
                )}

                {leaveType === "custom" && (
                    <>
                        <div>
                            <label htmlFor="casual-leave">Casual Leave</label>
                            <input
                                type="number"
                                onChange={(e) =>
                                    handleLeave(
                                        0,
                                        process.env.REACT_APP_LEAVE_CASUAL,
                                        "Casual",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div>
                            <label htmlFor="sick-leave">Sick Leave</label>
                            <input
                                type="number"
                                onChange={(e) =>
                                    handleLeave(
                                        1,
                                        process.env.REACT_APP_LEAVE_SICK,
                                        "Sick",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div>
                            <label htmlFor="annual-leave">Annual Leave</label>
                            <input
                                type="number"
                                onChange={(e) =>
                                    handleLeave(
                                        2,
                                        process.env.REACT_APP_LEAVE_ANNUAL,
                                        "Annual",
                                        e.target.value
                                    )
                                }
                            />
                        </div>

                        <div>
                            <label htmlFor="holiday">Govt. Holiday</label>
                            <input
                                type="number"
                                onChange={(e) =>
                                    handleLeave(
                                        3,
                                        process.env.REACT_APP_LEAVE_HOLIDAY,
                                        "Holiday",
                                        e.target.value
                                    )
                                }
                            />
                        </div>
                    </>
                )}
            </div>

            <div>
                <button disabled={isDisable} onClick={handleSubmit}>Submit</button>
            </div>
        </>
    );
}
