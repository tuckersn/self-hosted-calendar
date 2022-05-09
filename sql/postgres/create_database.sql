--
--
SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;
SET default_table_access_method = heap;
--
--
CREATE TABLE public.board (
    id integer NOT NULL,
    uuid character varying NOT NULL,
    board_name character varying NOT NULL,
    description character varying NOT NULL,
    created time with time zone DEFAULT now() NOT NULL
);
--
--
CREATE TABLE public.board_member (
    id integer NOT NULL,
    joined time with time zone DEFAULT now() NOT NULL,
    is_admin boolean DEFAULT false,
    board_id integer,
    "user_Id" integer
);
--
--
ALTER TABLE public.board_member ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."boardMembers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
--
ALTER TABLE public.board ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.board_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
    CYCLE
);
--
--
CREATE TABLE public.event (
    id integer NOT NULL,
    event_name character varying NOT NULL,
    description character varying NOT NULL,
    start_date time with time zone NOT NULL,
    end_date time with time zone NOT NULL,
    location character varying,
    uuid character varying NOT NULL
);
--
--
CREATE TABLE public.event_attendee (
    id integer NOT NULL,
    event_id integer NOT NULL,
    user_id integer NOT NULL,
    is_attending boolean DEFAULT false NOT NULL,
    is_host boolean DEFAULT false NOT NULL
);
--
--
ALTER TABLE public.event_attendee ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."eventAttendee_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
--
CREATE TABLE public.todo_item (
    id integer NOT NULL,
    item_type smallint NOT NULL,
    status smallint NOT NULL,
    uuid character varying NOT NULL,
    title character varying NOT NULL,
    due time with time zone,
    updated time with time zone,
    created time with time zone DEFAULT now() NOT NULL,
    completed time with time zone
);
--
--
CREATE TABLE public.user_api_key (
    id integer NOT NULL,
    key_hash character varying NOT NULL,
    created time with time zone DEFAULT now() NOT NULL,
    expiration time with time zone,
    active boolean DEFAULT true NOT NULL,
    user_id integer NOT NULL,
    key_name character varying DEFAULT 'API Key'::character varying NOT NULL,
    description character varying(5)
);
--
--
ALTER TABLE public.user_api_key ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."userApiKey_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
--
CREATE TABLE public.user_ (
    id integer NOT NULL,
    uuid character varying NOT NULL,
    username character varying NOT NULL,
    email character varying,
    password_hash character varying NOT NULL,
    created time with time zone DEFAULT now() NOT NULL,
    display_name character varying,
    user_type smallint NOT NULL,
    password_salt character varying NOT NULL
);
--
--
ALTER TABLE public.user_ ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.user__id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
--
--
CREATE TABLE public.user_login (
    id integer NOT NULL,
    user_id integer NOT NULL,
    login_date time with time zone DEFAULT now() NOT NULL,
    ip character varying NOT NULL,
    login_method smallint NOT NULL,
    user_agent character varying
);
--
--
ALTER TABLE ONLY public.board_member
    ADD CONSTRAINT board_members_pkey PRIMARY KEY (id);
--
--
ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (id);
--
--
ALTER TABLE ONLY public.event_attendee
    ADD CONSTRAINT event_attendee_pkey PRIMARY KEY (id);
--
--
ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);
--
--
ALTER TABLE ONLY public.todo_item
    ADD CONSTRAINT todo_item_pkey PRIMARY KEY (id);
--
--
ALTER TABLE ONLY public.user_api_key
    ADD CONSTRAINT user_api_key_pkey PRIMARY KEY (id);
--
--
ALTER TABLE ONLY public.user_login
    ADD CONSTRAINT user_login_pkey PRIMARY KEY (id);
--
--
ALTER TABLE ONLY public.user_
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);
--
--
CREATE UNIQUE INDEX index_board_uuid ON public.board USING btree (uuid);
--
--
CREATE UNIQUE INDEX index_event_uuid ON public.event USING btree (uuid);
--
--
CREATE INDEX index_user_api_key_key_name ON public.user_api_key USING btree (key_name);
--
--
CREATE INDEX index_user_api_key_user_id ON public.user_api_key USING btree (user_id);
--
--
CREATE UNIQUE INDEX index_user_email ON public.user_ USING btree (email);
--
--
CREATE UNIQUE INDEX index_user_username ON public.user_ USING btree (username);
--
--
CREATE UNIQUE INDEX index_user_uuid ON public.user_ USING btree (uuid);
--
--
