export interface Login {
  id?: string;
  username: string;
  password: string;
}

export interface Token {
  token: string;
}

export interface UserData {
  id: number;
  name: string;
  username: string;
}

export interface Schedules {
  id: number;
  patientName: string;
  professionalName: string;
  dateTime: string;
  specialty: string;
}

export interface SelectItem {
  value: number;
  label: string;
}
