import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Icon from '../../../components/AppIcon.tsx';
import Image from '../../../components/AppImage.tsx';
import Button from '../../../components/ui/Button.tsx';
import Input from '../../../components/ui/Input.tsx';
import Select from '../../../components/ui/Select.tsx';
import type { StaffMember } from '../types/index';

interface StaffDirectoryProps {
  staff: StaffMember[];
}

const StaffDirectory = ({ staff }: StaffDirectoryProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampus, setSelectedCampus] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const campuses = [...new Set(staff.map(member => member.campus))];
  const departments = [...new Set(staff.map(member => member.department))];

  const campusOptions = [
    { value: 'all', label: 'Todos los Campus' },
    ...campuses.map(campus => ({ value: campus, label: campus }))
  ];

  const departmentOptions = [
    { value: 'all', label: 'Todos los Departamentos' },
    ...departments.map(dept => ({ value: dept, label: dept }))
  ];

  const filteredStaff = staff.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         member.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampus = selectedCampus === 'all' || member.campus === selectedCampus;
    const matchesDepartment = selectedDepartment === 'all' || member.department === selectedDepartment;
    
    return matchesSearch && matchesCampus && matchesDepartment;
  });

  return (
    <section className="py-16 bg-canvas">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-institutional mb-4">
            Directorio de Personal
          </h2>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Encuentra y contacta directamente a nuestro equipo de profesionales
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="bg-white rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              type="search"
              placeholder="Buscar por nombre o cargo..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full"
            />
            
            <Select
              placeholder="Filtrar por campus"
              options={campusOptions}
              value={selectedCampus}
              onChange={(value) => setSelectedCampus(value as string)}
            />
            
            <Select
              placeholder="Filtrar por departamento"
              options={departmentOptions}
              value={selectedDepartment}
              onChange={(value) => setSelectedDepartment(value as string)}
            />
          </div>
        </motion.div>

        {/* Staff Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredStaff.map((member, index) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.05 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative">
                <Image
                  src={member.image}
                  alt={member.alt}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                    {member.campus}
                  </span>
                </div>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-heading font-semibold text-text-primary mb-1">
                  {member.name}
                </h3>
                <p className="text-primary text-sm font-medium mb-1">
                  {member.position}
                </p>
                <p className="text-text-secondary text-sm mb-3">
                  {member.department}
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Phone" size={14} className="flex-shrink-0" />
                    <a 
                      href={`tel:${member.phone}`}
                      className="hover:text-primary transition-colors truncate"
                    >
                      {member.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Mail" size={14} className="flex-shrink-0" />
                    <a 
                      href={`mailto:${member.email}`}
                      className="hover:text-primary transition-colors truncate"
                    >
                      {member.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm text-text-secondary">
                    <Icon name="Clock" size={14} className="flex-shrink-0" />
                    <span className="truncate">{member.availability}</span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Phone"
                    iconPosition="left"
                    className="flex-1 text-xs"
                  >
                    Llamar
                  </Button>
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Mail"
                    iconPosition="left"
                    className="flex-1 text-xs"
                  >
                    Email
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredStaff.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Icon name="Users" size={48} className="text-text-secondary mx-auto mb-4" />
            <p className="text-text-secondary">No se encontraron miembros del personal con los filtros aplicados.</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCampus('all');
                setSelectedDepartment('all');
              }}
              className="mt-4"
            >
              Limpiar Filtros
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default StaffDirectory;