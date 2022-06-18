--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 14.1

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: board; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.board (
    id integer NOT NULL,
    uuid character varying NOT NULL,
    board_name character varying NOT NULL,
    description character varying NOT NULL,
    created time with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.board OWNER TO postgres;

--
-- Name: board_member; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.board_member (
    id integer NOT NULL,
    joined time with time zone DEFAULT now() NOT NULL,
    is_admin boolean DEFAULT false,
    board_id integer,
    "user_Id" integer
);


ALTER TABLE public.board_member OWNER TO postgres;

--
-- Name: boardMembers_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- Name: board_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- Name: calendar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calendar (
    id integer NOT NULL,
    uuid character varying NOT NULL,
    "calendarName" character varying NOT NULL,
    description character varying NOT NULL,
    color character varying,
    "calendarType" smallint NOT NULL
);


ALTER TABLE public.calendar OWNER TO postgres;

--
-- Name: calendar_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.calendar ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.calendar_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: calendar_member; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calendar_member (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "calendarId" integer NOT NULL,
    "isAdmin" boolean DEFAULT false NOT NULL,
    "isWriter" boolean DEFAULT false NOT NULL,
    joined time with time zone NOT NULL
);


ALTER TABLE public.calendar_member OWNER TO postgres;

--
-- Name: event; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event (
    id integer NOT NULL,
    event_name character varying NOT NULL,
    start_date time with time zone NOT NULL,
    end_date time with time zone NOT NULL,
    location character varying,
    uuid character varying NOT NULL,
    description jsonb
);


ALTER TABLE public.event OWNER TO postgres;

--
-- Name: event_attendee; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_attendee (
    id integer NOT NULL,
    event_id integer NOT NULL,
    user_id integer NOT NULL,
    is_attending boolean DEFAULT false NOT NULL,
    is_host boolean DEFAULT false NOT NULL
);


ALTER TABLE public.event_attendee OWNER TO postgres;

--
-- Name: eventAttendee_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- Name: task; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task (
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


ALTER TABLE public.task OWNER TO postgres;

--
-- Name: user_api_key; Type: TABLE; Schema: public; Owner: postgres
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


ALTER TABLE public.user_api_key OWNER TO postgres;

--
-- Name: userApiKey_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- Name: user_; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_ (
    id integer NOT NULL,
    uuid character varying NOT NULL,
    username character varying NOT NULL,
    email character varying,
    password_hash character varying,
    created time with time zone DEFAULT now() NOT NULL,
    display_name character varying,
    user_type smallint NOT NULL,
    enabled boolean DEFAULT true
);


ALTER TABLE public.user_ OWNER TO postgres;

--
-- Name: user__id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
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
-- Name: user_login; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_login (
    id integer NOT NULL,
    user_id integer NOT NULL,
    login_date time with time zone DEFAULT now() NOT NULL,
    ip character varying NOT NULL,
    login_method smallint NOT NULL,
    user_agent character varying
);


ALTER TABLE public.user_login OWNER TO postgres;

--
-- Name: board_member board_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.board_member
    ADD CONSTRAINT board_members_pkey PRIMARY KEY (id);


--
-- Name: board board_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (id);


--
-- Name: calendar_member calendar_member_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calendar_member
    ADD CONSTRAINT calendar_member_pkey PRIMARY KEY (id);


--
-- Name: calendar calendar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calendar
    ADD CONSTRAINT calendar_pkey PRIMARY KEY (id);


--
-- Name: event_attendee event_attendee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_attendee
    ADD CONSTRAINT event_attendee_pkey PRIMARY KEY (id);


--
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- Name: task todo_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT todo_item_pkey PRIMARY KEY (id);


--
-- Name: user_api_key user_api_key_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_api_key
    ADD CONSTRAINT user_api_key_pkey PRIMARY KEY (id);


--
-- Name: user_login user_login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_login
    ADD CONSTRAINT user_login_pkey PRIMARY KEY (id);


--
-- Name: user_ user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: index_board_uuid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_board_uuid ON public.board USING btree (uuid);


--
-- Name: index_event_uuid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_event_uuid ON public.event USING btree (uuid);


--
-- Name: index_user_api_key_key_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_user_api_key_key_name ON public.user_api_key USING btree (key_name);


--
-- Name: index_user_api_key_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_user_api_key_user_id ON public.user_api_key USING btree (user_id);


--
-- Name: index_user_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_user_email ON public.user_ USING btree (email);


--
-- Name: index_user_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_user_username ON public.user_ USING btree (username);


--
-- Name: index_user_uuid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_user_uuid ON public.user_ USING btree (uuid);


--
-- Name: TABLE board; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.board TO calendar_user;


--
-- Name: TABLE board_member; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.board_member TO calendar_user;


--
-- Name: SEQUENCE "boardMembers_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."boardMembers_id_seq" TO calendar_user;


--
-- Name: SEQUENCE board_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.board_id_seq TO calendar_user;


--
-- Name: TABLE event; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.event TO calendar_user;


--
-- Name: TABLE event_attendee; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.event_attendee TO calendar_user;


--
-- Name: SEQUENCE "eventAttendee_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."eventAttendee_id_seq" TO calendar_user;


--
-- Name: TABLE task; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.task TO calendar_user;


--
-- Name: TABLE user_api_key; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_api_key TO calendar_user;


--
-- Name: SEQUENCE "userApiKey_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."userApiKey_id_seq" TO calendar_user;


--
-- Name: TABLE user_; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_ TO calendar_user;


--
-- Name: TABLE user_login; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_login TO calendar_user;


--
-- PostgreSQL database dump complete
--

