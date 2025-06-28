import React, { useState } from 'react';
import { Card, Button, message, Form, Input, Select, Divider, Popconfirm } from 'antd';
import {
  EditOutlined,
  SaveOutlined,
  CloseOutlined,
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  PlusOutlined,
  DeleteOutlined,
} from '@ant-design/icons';
import type { User } from '@/types/user-managment.types';

interface ContactPerson {
  id: string;
  name: string;
  phone: string;
  email: string;
  relation: string;
  company?: string;
  notes?: string;
  isPrimary?: boolean;
}

interface ContactDetailsCardProps {
  user?: User | null;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ContactDetailsCard: React.FC<ContactDetailsCardProps> = ({ user }) => {
  const [isAddingContact, setIsAddingContact] = useState(false);
  const [editingContactId, setEditingContactId] = useState<string | null>(null);
  const [form] = Form.useForm();

  // Mock contact persons data - replace with actual data from props or API
  const [contactPersons, setContactPersons] = useState<ContactPerson[]>([
    {
      id: '1',
      name: 'Jane Doe',
      phone: '+1 234 567 8901',
      email: 'jane.doe@example.com',
      relation: 'Spouse',
      company: 'Tech Corp',
      notes: 'Emergency contact',
      isPrimary: true,
    },
    {
      id: '2',
      name: 'Dr. Smith',
      phone: '+1 234 567 8902',
      email: 'dr.smith@medical.com',
      relation: 'Doctor',
      company: 'Medical Center',
      notes: 'Family physician',
      isPrimary: false,
    },
    {
      id: '3',
      name: 'Mike Johnson',
      phone: '+1 234 567 8903',
      email: 'mike.j@business.com',
      relation: 'Business Partner',
      company: 'Johnson & Associates',
      notes: 'Business contact',
      isPrimary: false,
    },
  ]);

  const handleAddContact = () => {
    form.resetFields();
    setIsAddingContact(true);
  };

  const handleEditContact = (contact: ContactPerson) => {
    form.setFieldsValue({
      name: contact.name,
      phone: contact.phone,
      email: contact.email,
      relation: contact.relation,
      company: contact.company,
      notes: contact.notes,
      isPrimary: contact.isPrimary,
    });
    setEditingContactId(contact.id);
  };

  const handleSaveContact = async () => {
    try {
      const values = await form.validateFields();

      // Simulate API call for saving contact
      await new Promise(resolve => setTimeout(resolve, 500));

      if (editingContactId) {
        // Update existing contact
        setContactPersons(prev =>
          prev.map(contact =>
            contact.id === editingContactId ? { ...contact, ...values } : contact
          )
        );
        message.success('Contact updated successfully!');
        setEditingContactId(null);
      } else {
        // Add new contact
        const newContact: ContactPerson = {
          id: Date.now().toString(),
          ...values,
        };
        setContactPersons(prev => [...prev, newContact]);
        message.success('Contact added successfully!');
        setIsAddingContact(false);
      }

      form.resetFields();
    } catch (err) {
      console.error('Error saving contact:', err);
      message.error('Failed to save contact. Please try again.');
    }
  };

  const handleDeleteContact = async (contactId: string) => {
    try {
      // Simulate API call for deleting contact
      await new Promise(resolve => setTimeout(resolve, 300));

      setContactPersons(prev => prev.filter(contact => contact.id !== contactId));
      message.success('Contact deleted successfully!');
    } catch (err) {
      console.error('Error deleting contact:', err);
      message.error('Failed to delete contact. Please try again.');
    }
  };

  const handleCancel = () => {
    setIsAddingContact(false);
    setEditingContactId(null);
    form.resetFields();
  };

  const ContactForm = ({ title }: { title: string }) => (
    <Card
      title={
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <UserOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
          <span style={{ fontSize: '14px', fontWeight: '600' }}>{title}</span>
        </div>
      }
      size="small"
      style={{ marginBottom: '16px' }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Full Name"
          rules={[{ required: true, message: 'Please enter contact name' }]}
        >
          <Input placeholder="Enter contact's full name" />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Phone Number"
          rules={[{ required: true, message: 'Please enter phone number' }]}
        >
          <Input placeholder="Enter phone number" />
        </Form.Item>

        <Form.Item
          name="email"
          label="Email Address"
          rules={[
            { required: true, message: 'Please enter email address' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input placeholder="Enter email address" />
        </Form.Item>

        <Form.Item
          name="relation"
          label="Relation/Role"
          rules={[{ required: true, message: 'Please select relation' }]}
        >
          <Select placeholder="Select relation or role">
            <Select.Option value="Spouse">Spouse</Select.Option>
            <Select.Option value="Parent">Parent</Select.Option>
            <Select.Option value="Sibling">Sibling</Select.Option>
            <Select.Option value="Child">Child</Select.Option>
            <Select.Option value="Friend">Friend</Select.Option>
            <Select.Option value="Doctor">Doctor</Select.Option>
            <Select.Option value="Lawyer">Lawyer</Select.Option>
            <Select.Option value="Business Partner">Business Partner</Select.Option>
            <Select.Option value="Colleague">Colleague</Select.Option>
            <Select.Option value="Manager">Manager</Select.Option>
            <Select.Option value="Employee">Employee</Select.Option>
            <Select.Option value="Other">Other</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item name="company" label="Company/Organization">
          <Input placeholder="Enter company or organization name" />
        </Form.Item>

        <Form.Item name="notes" label="Notes">
          <Input.TextArea rows={2} placeholder="Add any additional notes" />
        </Form.Item>

        <Form.Item name="isPrimary" valuePropName="checked">
          <Select placeholder="Set as primary contact">
            <Select.Option value={true}>Primary Contact</Select.Option>
            <Select.Option value={false}>Regular Contact</Select.Option>
          </Select>
        </Form.Item>
      </Form>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '16px' }}>
        <Button icon={<CloseOutlined />} onClick={handleCancel}>
          Cancel
        </Button>
        <Button type="primary" icon={<SaveOutlined />} onClick={handleSaveContact}>
          Save Contact
        </Button>
      </div>
    </Card>
  );

  return (
    <div>
      <Card
        title={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UserOutlined style={{ color: '#52c41a', fontSize: '16px' }} />
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Contact Persons</span>
            </div>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddContact}
              size="small"
              disabled={isAddingContact || editingContactId !== null}
            >
              Add Contact
            </Button>
          </div>
        }
        size="small"
        style={{ height: '100%' }}
      >
        {/* Add Contact Form */}
        {isAddingContact && <ContactForm title="Add New Contact Person" />}

        {/* Edit Contact Form */}
        {editingContactId && <ContactForm title="Edit Contact Person" />}

        {/* Contact Persons List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {contactPersons.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '24px',
                color: '#999',
                fontSize: '12px',
              }}
            >
              No contact persons added yet. Click "Add Contact" to get started.
            </div>
          ) : (
            contactPersons.map((contact, index) => (
              <div key={contact.id}>
                <div
                  style={{
                    padding: '12px',
                    backgroundColor: contact.isPrimary ? '#f6ffed' : '#fafafa',
                    borderRadius: '6px',
                    border: contact.isPrimary ? '1px solid #b7eb8f' : '1px solid #f0f0f0',
                    position: 'relative',
                  }}
                >
                  {contact.isPrimary && (
                    <div
                      style={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        fontSize: '8px',
                        color: '#52c41a',
                        backgroundColor: '#f6ffed',
                        padding: '2px 6px',
                        borderRadius: '10px',
                        border: '1px solid #b7eb8f',
                        fontWeight: '600',
                      }}
                    >
                      PRIMARY
                    </div>
                  )}

                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'flex-start',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontWeight: '600',
                          fontSize: '13px',
                          marginBottom: '6px',
                          color: '#333',
                          paddingRight: '60px',
                        }}
                      >
                        {contact.name}
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '10px', color: '#666' }}>
                            <PhoneOutlined style={{ marginRight: '4px' }} />
                            Phone:
                          </span>
                          <span
                            style={{ fontSize: '10px', color: '#333', fontFamily: 'monospace' }}
                          >
                            {contact.phone}
                          </span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '10px', color: '#666' }}>
                            <MailOutlined style={{ marginRight: '4px' }} />
                            Email:
                          </span>
                          <span style={{ fontSize: '10px', color: '#333' }}>{contact.email}</span>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span style={{ fontSize: '10px', color: '#666' }}>Relation:</span>
                          <span style={{ fontSize: '10px', color: '#333', fontWeight: '500' }}>
                            {contact.relation}
                          </span>
                        </div>

                        {contact.company && (
                          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ fontSize: '10px', color: '#666' }}>Company:</span>
                            <span style={{ fontSize: '10px', color: '#333' }}>
                              {contact.company}
                            </span>
                          </div>
                        )}

                        {contact.notes && (
                          <div style={{ marginTop: '4px' }}>
                            <div style={{ fontSize: '10px', color: '#666', marginBottom: '2px' }}>
                              Notes:
                            </div>
                            <div
                              style={{
                                fontSize: '10px',
                                color: '#333',
                                fontStyle: 'italic',
                                backgroundColor: 'rgba(0,0,0,0.02)',
                                padding: '4px 6px',
                                borderRadius: '4px',
                              }}
                            >
                              {contact.notes}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <Button
                        type="link"
                        icon={<EditOutlined />}
                        onClick={() => handleEditContact(contact)}
                        size="small"
                        style={{ padding: '0', height: 'auto', fontSize: '10px' }}
                        disabled={isAddingContact || editingContactId !== null}
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Delete contact"
                        description="Are you sure you want to delete this contact person?"
                        onConfirm={() => handleDeleteContact(contact.id)}
                        okText="Yes"
                        cancelText="No"
                        disabled={isAddingContact || editingContactId !== null}
                      >
                        <Button
                          type="link"
                          danger
                          icon={<DeleteOutlined />}
                          size="small"
                          style={{ padding: '0', height: 'auto', fontSize: '10px' }}
                          disabled={isAddingContact || editingContactId !== null}
                        >
                          Delete
                        </Button>
                      </Popconfirm>
                    </div>
                  </div>
                </div>

                {index < contactPersons.length - 1 && <Divider style={{ margin: '8px 0' }} />}
              </div>
            ))
          )}
        </div>
      </Card>
    </div>
  );
};

export default ContactDetailsCard;
