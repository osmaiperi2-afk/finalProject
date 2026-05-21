Feature: all tests related to patient module

  @api
  Scenario: verify GET patients return data
    Given doctor is logged in
    When user hits GET "/api-patients"
    Then verify status code is 200

  @api
  Scenario: verify doctor can create patient with POST
    Given doctor is logged in
    When user hits POST "/api-patients" with body
      """
      {
          "first_name": "string",
          "last_name": "string",
          "dob": "2026-05-20",
          "gender": "Male",
          "phone": "string",
          "email": "string",
          "address": "string",
          "emergency_contact_name": "string",
          "emergency_contact_phone": "string",
          "insurance_provider": "string",
          "insurance_policy_number": "string"
      }
      """
    Then verify status code is 201