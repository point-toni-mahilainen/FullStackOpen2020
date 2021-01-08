import { State } from "./state";
import { Patient } from "../types";

export type Action =
    | {
        type: "SET_PATIENT_LIST";
        payload: Patient[];
    }
    | {
        type: "FIND_PATIENT";
        payload: { patient: Patient };
    }
    | {
        type: "ADD_PATIENT";
        payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "SET_PATIENT_LIST":
            return {
                ...state,
                patients: {
                    ...action.payload.reduce(
                        (memo, patient) => ({ ...memo, [patient.id]: patient }),
                        {}
                    ),
                    ...state.patients
                }
            };
        case "FIND_PATIENT":
            return action.payload.patient ?
                {
                    ...state,
                    patient: action.payload.patient
                }
                : state;

        case "ADD_PATIENT":
            return {
                ...state,
                patients: {
                    ...state.patients,
                    [action.payload.id]: action.payload
                }
            };
        default:
            return state;
    }
};

export const setPatientList = (patientListFromApi: Patient[]): Action => {
    return {
        type: 'SET_PATIENT_LIST',
        payload: patientListFromApi
    };
};

export const findPatient = (patient: Patient): Action => {
    return {
        type: 'FIND_PATIENT',
        payload: { patient: patient }
    };
};

export const addPatient = (newPatient: Patient): Action => {
    return {
        type: 'ADD_PATIENT',
        payload: newPatient
    };
};