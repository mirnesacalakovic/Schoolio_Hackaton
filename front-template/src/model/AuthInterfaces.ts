
export interface LoginRequestDto {
  email: string;
  password: string;
}

export interface LoginResponseDto {
  id: string;
  fullName: string;
  email: string;
  role: string;
  token: string;
  teacherRole?: string;
}

export interface RegisterRequestDto {
  fullName: string;
  phoneNumber: string;
  address: string;
  email: string;
  password: string;
  role?: string; // Opcionalno, backend postavlja podrazumevanu vrednost
  teacherRole?: string | null; // Opcionalno
}
export interface RegisterResponseDto {
  id: string;
  fullName: string;
  email: string;
  address: string;
  phoneNumber: string;
  role: string;
  token: string;
  teacherRole: string;
}

export interface AuthUserDto {
  id: string;
  fullName: string;
  email: string;
  role: string;
  token: string;
}
