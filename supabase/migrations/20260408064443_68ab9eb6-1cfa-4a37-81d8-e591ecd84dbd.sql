
-- Contact submissions table
CREATE TABLE public.contact_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS for contact_submissions
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form" ON public.contact_submissions
  FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Authenticated can read submissions" ON public.contact_submissions
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can update submissions" ON public.contact_submissions
  FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Authenticated can delete submissions" ON public.contact_submissions
  FOR DELETE TO authenticated USING (true);

-- Activity log table
CREATE TABLE public.admin_activity_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  user_email TEXT,
  action TEXT NOT NULL,
  details JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated can read activity log" ON public.admin_activity_log
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated can insert activity log" ON public.admin_activity_log
  FOR INSERT TO authenticated WITH CHECK (true);
