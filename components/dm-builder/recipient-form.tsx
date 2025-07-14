import { useState } from "react"
import { Platform, UseCase, Recipient } from "@/types/dm-builder"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusCircle, X } from "lucide-react"

interface DMRecipientFormProps {
  platform: Platform
  useCase: UseCase
  recipient: Recipient
  onRecipientChange: (recipient: Recipient) => void
}

export function DMRecipientForm({
  platform,
  useCase,
  recipient,
  onRecipientChange,
}: DMRecipientFormProps) {
  const [customFields, setCustomFields] = useState<string[]>([])

  const handleChange = (field: keyof Recipient, value: string) => {
    const updatedRecipient = { ...recipient }
    updatedRecipient[field] = value
    onRecipientChange(updatedRecipient)
  }

  const handleCustomFieldChange = (fieldName: string, value: string) => {
    const updatedRecipient = { ...recipient }
    updatedRecipient.customFields = {
      ...(updatedRecipient.customFields || {}),
      [fieldName]: value,
    }
    onRecipientChange(updatedRecipient)
  }

  const addCustomField = () => {
    setCustomFields([...customFields, ""])
  }

  const removeCustomField = (index: number) => {
    const updatedFields = customFields.filter((_, i) => i !== index)
    setCustomFields(updatedFields)
    const updatedCustomFields = { ...recipient.customFields }
    delete updatedCustomFields[customFields[index]]
    onRecipientChange({
      ...recipient,
      customFields: updatedCustomFields,
    })
  }

  const getRequiredFields = () => {
    const fields: Array<{ key: keyof Recipient; label: string }> = [
      { key: "name", label: "Recipient Name" },
    ]

    switch (platform) {
      case "linkedin":
        fields.push(
          { key: "role", label: "Role/Position" },
          { key: "company", label: "Company" }
        )
        break
      case "email":
        fields.push({ key: "email", label: "Email Address" })
        if (useCase === "cold-sales" || useCase === "partnership") {
          fields.push({ key: "company", label: "Company" })
        }
        break
      case "instagram":
      case "twitter":
        fields.push({ key: "profile", label: "Profile Handle" })
        break
      case "whatsapp":
        if (useCase === "client-follow-up" || useCase === "sales-touchpoint") {
          fields.push({ key: "company", label: "Company" })
        }
        break
    }

    return fields
  }

  const getOptionalFields = () => {
    const fields: Array<{ key: keyof Recipient; label: string }> = []

    switch (useCase) {
      case "networking":
      case "cold-dm":
        fields.push({ key: "mutualInterest", label: "Mutual Interest/Context" })
        break
      case "partnership":
      case "collab":
        fields.push({ key: "website", label: "Website/Portfolio" })
        break
    }

    return fields
  }

  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        {getRequiredFields().map(({ key, label }) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{label} *</Label>
            {key === "mutualInterest" ? (
              <Textarea
                id={key}
                value={recipient[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="resize-none"
              />
            ) : (
              <Input
                id={key}
                value={recipient[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            )}
          </div>
        ))}

        {getOptionalFields().map(({ key, label }) => (
          <div key={key} className="space-y-2">
            <Label htmlFor={key}>{label}</Label>
            {key === "mutualInterest" ? (
              <Textarea
                id={key}
                value={recipient[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
                className="resize-none"
              />
            ) : (
              <Input
                id={key}
                value={recipient[key] || ""}
                onChange={(e) => handleChange(key, e.target.value)}
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            )}
          </div>
        ))}

        {customFields.map((field, index) => (
          <div key={index} className="space-y-2 relative">
            <div className="flex items-center space-x-2">
              <Input
                value={field}
                onChange={(e) => {
                  const updatedFields = [...customFields]
                  updatedFields[index] = e.target.value
                  setCustomFields(updatedFields)
                }}
                placeholder="Custom field name"
                className="flex-1"
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeCustomField(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {field && (
              <Input
                value={recipient.customFields?.[field] || ""}
                onChange={(e) => handleCustomFieldChange(field, e.target.value)}
                placeholder="Enter value"
              />
            )}
          </div>
        ))}
      </div>

      <Button
        variant="outline"
        className="w-full"
        onClick={addCustomField}
      >
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Custom Field
      </Button>
    </Card>
  )
} 