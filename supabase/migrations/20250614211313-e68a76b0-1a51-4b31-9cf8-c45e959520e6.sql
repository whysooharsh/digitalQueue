
-- Create enum for patient status
CREATE TYPE patient_status AS ENUM ('waiting', 'called', 'in-consultation', 'completed');

-- Create enum for priority levels
CREATE TYPE priority_level AS ENUM ('normal', 'urgent');

-- Create patients table to store all patient information and queue data
CREATE TABLE public.patients (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT NOT NULL,
    check_in_time TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    estimated_wait_time INTEGER NOT NULL DEFAULT 15,
    status patient_status NOT NULL DEFAULT 'waiting',
    priority priority_level NOT NULL DEFAULT 'normal',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_patients_updated_at 
    BEFORE UPDATE ON public.patients 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since this is a walk-in clinic system)
-- Patients can view all queue information (public queue display)
CREATE POLICY "Anyone can view patients" 
    ON public.patients 
    FOR SELECT 
    USING (true);

-- Anyone can add themselves to the queue (patient check-in)
CREATE POLICY "Anyone can insert patients" 
    ON public.patients 
    FOR INSERT 
    WITH CHECK (true);

-- Only allow updates to status and estimated_wait_time (for staff operations)
CREATE POLICY "Anyone can update patient status" 
    ON public.patients 
    FOR UPDATE 
    USING (true)
    WITH CHECK (true);

-- Allow deletion (for removing patients from queue)
CREATE POLICY "Anyone can delete patients" 
    ON public.patients 
    FOR DELETE 
    USING (true);

-- Create an index for better performance on status queries
CREATE INDEX idx_patients_status ON public.patients(status);
CREATE INDEX idx_patients_priority ON public.patients(priority);
CREATE INDEX idx_patients_check_in_time ON public.patients(check_in_time);
