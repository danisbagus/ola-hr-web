import type { FormRules } from 'element-plus'

export const rules: FormRules = {
  name: [{ required: true, message: 'Name is required', trigger: 'blur' }]
}
