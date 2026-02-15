import React from 'react';
import Card from './ui/Card';

const CategoryCard = ({ title, description, icon, onClick, delay = 0 }) => {
  return (
    <Card 
      onClick={onClick}
      hoverable
      isAnimated
      className="p-4"
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: delay, duration: 0.4, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="mb-4 text-primary opacity-75">{icon}</div>
      <h3 className="h5 fw-bold text-uppercase text-white mb-3 tracking-wide">{title}</h3>
      <p className="small mb-0" style={{ color: 'var(--ef-text-muted)', lineHeight: '1.5' }}>
        {description}
      </p>
    </Card>
  );
};

export default CategoryCard;
