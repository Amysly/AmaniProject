import axios from 'axios';

const assignmentAPI_URL = '/api/student-assignment';

export interface AssignmentData {
  assignmentQuestion: string;
  submissionDeadline: string;
  level: string;
  coursesId: string;
}

export interface AssignmentResponse {
  _id: string;
  assignmentQuestion: string;
  submissionDeadline: string;
  level: string;
  coursesId: string;
}

interface UpdateAssignmentPayload {
  _id: string;
  updatedData: {
    assignmentQuestion?: string;
    submissionDeadline?: string;
    level?: string;
    department?: string;
    coursesId?: string;
  };
}

// ========================
// GET ASSIGNMENTS BY COURSE
// ========================
const getAssignments = async (
  coursesId: string,
  token: string
): Promise<AssignmentResponse[]> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.get<AssignmentResponse[]>(
    `${assignmentAPI_URL}/course/${coursesId}`,
    config
  );

  return response.data;
};

// ========================
// CREATE ASSIGNMENT
// ========================
const createAssignment = async (
  assignmentData: AssignmentData,
  token: string
): Promise<AssignmentResponse> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.post<AssignmentResponse>(
    assignmentAPI_URL,
    assignmentData,
    config
  );

  return response.data;
};

// ========================
// UPDATE ASSIGNMENT
// ========================
const updateAssignment = async (
  payload: UpdateAssignmentPayload,
  token: string
): Promise<AssignmentResponse> => {
  const { _id, updatedData } = payload;

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.put<AssignmentResponse>(
    `${assignmentAPI_URL}/${_id}`,
    updatedData,
    config
  );

  return response.data;
};

// ========================
// DELETE ASSIGNMENT
// ========================
const deleteAssignment = async (
  _id: string,
  token: string
): Promise<{ id: string; message: string }> => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  const response = await axios.delete<{ id: string; message: string }>(
    `${assignmentAPI_URL}/${_id}`,
    config
  );

  return response.data;
};

const assignmentService = {
  getAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment,
};

export default assignmentService;
