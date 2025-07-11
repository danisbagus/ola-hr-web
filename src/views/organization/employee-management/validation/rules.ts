import type { FormRules } from 'element-plus'

export const rules: FormRules = {
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }],
  email: [{ required: true, type: 'email', message: 'Valid email required', trigger: 'blur' }],
  phone_number: [{ required: true, message: 'Phone number is required', trigger: 'blur' }],
  employment_status: [{ required: true, message: 'Select status', trigger: 'change' }],
  gender: [{ required: true, message: 'Select gender', trigger: 'change' }],
  division_id: [{ required: true, message: 'Select division', trigger: 'change' }],
  role_id: [{ required: true, message: 'Select role', trigger: 'change' }],
  hire_date: [{ required: true, message: 'Hire date is required', trigger: 'change' }],
  birth_date: [{ required: true, message: 'Birth date is required', trigger: 'change' }]
}
