--
-- PostgreSQL database dump
--

-- Dumped from database version 13.3
-- Dumped by pg_dump version 14.1

-- Started on 2022-06-24 23:11:53

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
-- TOC entry 200 (class 1259 OID 24720)
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
-- TOC entry 202 (class 1259 OID 24740)
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
-- TOC entry 203 (class 1259 OID 24749)
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
-- TOC entry 201 (class 1259 OID 24738)
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
-- TOC entry 213 (class 1259 OID 32869)
-- Name: calendar; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calendar (
    id integer NOT NULL,
    uuid character varying NOT NULL,
    calendar_name character varying NOT NULL,
    description character varying NOT NULL,
    color character varying,
    calendar_type smallint NOT NULL
);


ALTER TABLE public.calendar OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 32877)
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
-- TOC entry 215 (class 1259 OID 32879)
-- Name: calendar_member; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.calendar_member (
    id integer NOT NULL,
    user_id integer NOT NULL,
    calendar_id integer NOT NULL,
    is_admin boolean DEFAULT false NOT NULL,
    is_writer boolean DEFAULT false NOT NULL,
    joined time with time zone NOT NULL
);


ALTER TABLE public.calendar_member OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 24760)
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
-- TOC entry 204 (class 1259 OID 24751)
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
-- TOC entry 205 (class 1259 OID 24758)
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
-- TOC entry 207 (class 1259 OID 24768)
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
-- TOC entry 210 (class 1259 OID 24816)
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
-- TOC entry 211 (class 1259 OID 24827)
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
-- TOC entry 208 (class 1259 OID 24777)
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
-- TOC entry 212 (class 1259 OID 24833)
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
-- TOC entry 209 (class 1259 OID 24786)
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
-- TOC entry 2922 (class 2606 OID 24748)
-- Name: board_member board_members_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.board_member
    ADD CONSTRAINT board_members_pkey PRIMARY KEY (id);


--
-- TOC entry 2919 (class 2606 OID 24730)
-- Name: board board_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.board
    ADD CONSTRAINT board_pkey PRIMARY KEY (id);


--
-- TOC entry 2944 (class 2606 OID 32885)
-- Name: calendar_member calendar_member_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calendar_member
    ADD CONSTRAINT calendar_member_pkey PRIMARY KEY (id);


--
-- TOC entry 2942 (class 2606 OID 32876)
-- Name: calendar calendar_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.calendar
    ADD CONSTRAINT calendar_pkey PRIMARY KEY (id);


--
-- TOC entry 2924 (class 2606 OID 24757)
-- Name: event_attendee event_attendee_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_attendee
    ADD CONSTRAINT event_attendee_pkey PRIMARY KEY (id);


--
-- TOC entry 2926 (class 2606 OID 24767)
-- Name: event event_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event
    ADD CONSTRAINT event_pkey PRIMARY KEY (id);


--
-- TOC entry 2929 (class 2606 OID 24776)
-- Name: task todo_item_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task
    ADD CONSTRAINT todo_item_pkey PRIMARY KEY (id);


--
-- TOC entry 2940 (class 2606 OID 24826)
-- Name: user_api_key user_api_key_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_api_key
    ADD CONSTRAINT user_api_key_pkey PRIMARY KEY (id);


--
-- TOC entry 2936 (class 2606 OID 24794)
-- Name: user_login user_login_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_login
    ADD CONSTRAINT user_login_pkey PRIMARY KEY (id);


--
-- TOC entry 2934 (class 2606 OID 24785)
-- Name: user_ user_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- TOC entry 2920 (class 1259 OID 24805)
-- Name: index_board_uuid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_board_uuid ON public.board USING btree (uuid);


--
-- TOC entry 2927 (class 1259 OID 24807)
-- Name: index_event_uuid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_event_uuid ON public.event USING btree (uuid);


--
-- TOC entry 2937 (class 1259 OID 24836)
-- Name: index_user_api_key_key_name; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_user_api_key_key_name ON public.user_api_key USING btree (key_name);


--
-- TOC entry 2938 (class 1259 OID 24830)
-- Name: index_user_api_key_user_id; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX index_user_api_key_user_id ON public.user_api_key USING btree (user_id);


--
-- TOC entry 2930 (class 1259 OID 24810)
-- Name: index_user_email; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_user_email ON public.user_ USING btree (email);


--
-- TOC entry 2931 (class 1259 OID 24809)
-- Name: index_user_username; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_user_username ON public.user_ USING btree (username);


--
-- TOC entry 2932 (class 1259 OID 24808)
-- Name: index_user_uuid; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX index_user_uuid ON public.user_ USING btree (uuid);


--
-- TOC entry 3080 (class 0 OID 0)
-- Dependencies: 200
-- Name: TABLE board; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.board TO calendar_user;


--
-- TOC entry 3081 (class 0 OID 0)
-- Dependencies: 202
-- Name: TABLE board_member; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.board_member TO calendar_user;


--
-- TOC entry 3082 (class 0 OID 0)
-- Dependencies: 203
-- Name: SEQUENCE "boardMembers_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."boardMembers_id_seq" TO calendar_user;


--
-- TOC entry 3083 (class 0 OID 0)
-- Dependencies: 201
-- Name: SEQUENCE board_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.board_id_seq TO calendar_user;


--
-- TOC entry 3084 (class 0 OID 0)
-- Dependencies: 213
-- Name: TABLE calendar; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.calendar TO calendar_user;


--
-- TOC entry 3085 (class 0 OID 0)
-- Dependencies: 214
-- Name: SEQUENCE calendar_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.calendar_id_seq TO calendar_user;


--
-- TOC entry 3086 (class 0 OID 0)
-- Dependencies: 215
-- Name: TABLE calendar_member; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.calendar_member TO calendar_user;


--
-- TOC entry 3087 (class 0 OID 0)
-- Dependencies: 206
-- Name: TABLE event; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.event TO calendar_user;


--
-- TOC entry 3088 (class 0 OID 0)
-- Dependencies: 204
-- Name: TABLE event_attendee; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.event_attendee TO calendar_user;


--
-- TOC entry 3089 (class 0 OID 0)
-- Dependencies: 205
-- Name: SEQUENCE "eventAttendee_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."eventAttendee_id_seq" TO calendar_user;


--
-- TOC entry 3090 (class 0 OID 0)
-- Dependencies: 207
-- Name: TABLE task; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.task TO calendar_user;


--
-- TOC entry 3091 (class 0 OID 0)
-- Dependencies: 210
-- Name: TABLE user_api_key; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_api_key TO calendar_user;


--
-- TOC entry 3092 (class 0 OID 0)
-- Dependencies: 211
-- Name: SEQUENCE "userApiKey_id_seq"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public."userApiKey_id_seq" TO calendar_user;


--
-- TOC entry 3093 (class 0 OID 0)
-- Dependencies: 208
-- Name: TABLE user_; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_ TO calendar_user;


--
-- TOC entry 3094 (class 0 OID 0)
-- Dependencies: 212
-- Name: SEQUENCE user__id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.user__id_seq TO calendar_user;


--
-- TOC entry 3095 (class 0 OID 0)
-- Dependencies: 209
-- Name: TABLE user_login; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.user_login TO calendar_user;


-- Completed on 2022-06-24 23:11:53

--
-- PostgreSQL database dump complete
--

