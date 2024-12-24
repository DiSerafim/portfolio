CREATE TABLE portfolio_db.education (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_name VARCHAR(255) NOT NULL,
    institution VARCHAR(255) NOT NULL,
    start_date DATE,
    end_date DATE,
    description TEXT,
    certificate_url VARCHAR(255)
);
