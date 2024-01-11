/*==============================================================*/
/* Table: breath                                                */
/*==============================================================*/
create table breath 
(
   bt_id                serial                        not null,
   bt_date              timestamp                      not null,
   bt_breath_frequency  decimal                        not null,
   constraint pk_breath primary key  (bt_id)
);

/*==============================================================*/
/* Table: controller                                            */
/*==============================================================*/
create table controller 
(
   ctr_id               serial                        not null,
   usr_id               integer                        null,
   emg_id               integer                        null,
   temp_id              integer                        null,
   bt_id                integer                        null,
   ecg_id               integer                        null,
   ctr_currently_date   timestamp                      not null,
   constraint pk_controller primary key  (ctr_id)
);

/*==============================================================*/
/* Table: ecg                                                   */
/*==============================================================*/
create table ecg 
(
   ecg_id               serial                        not null,
   ecg_date             timestamp                      not null,
   ecg_pulse            decimal                        not null,
   constraint pk_ecg primary key  (ecg_id)
);

/*==============================================================*/
/* Table: emg                                                   */
/*==============================================================*/
create table emg 
(
   emg_id               serial                        not null,
   emg_date             timestamp                      not null,
   emg_muscular_tension decimal                        not null,
   constraint pk_emg primary key  (emg_id)
);

/*==============================================================*/
/* Table: temperature                                           */
/*==============================================================*/
create table temperature 
(
   temp_id              serial                        not null,
   temp_date            timestamp                      not null,
   temp_temperature     decimal                        not null,
   constraint pk_temperature primary key  (temp_id)
);

/*==============================================================*/
/* Table: "user"                                                */
/*==============================================================*/
create table "user" 
(
   usr_id               serial                        not null,
   usr_birth_date       date                           not null,
   usr_gender           varchar(100)                   not null,
   usr_full_name        varchar(100)                   null,
   usr_city             varchar(100)                   not null,
   usr_weight           decimal                        not null,
   usr_height           decimal                        not null,
   constraint pk_user primary key  (usr_id)
);

alter table controller
   add constraint fk_controll_reference_user foreign key (usr_id)
      references "user" (usr_id)
      on update restrict
      on delete restrict;

alter table controller
   add constraint fk_controll_reference_emg foreign key (emg_id)
      references emg (emg_id)
      on update restrict
      on delete restrict;

alter table controller
   add constraint fk_controll_reference_temperat foreign key (temp_id)
      references temperature (temp_id)
      on update restrict
      on delete restrict;

alter table controller
   add constraint fk_controll_reference_breath foreign key (bt_id)
      references breath (bt_id)
      on update restrict
      on delete restrict;

alter table controller
   add constraint fk_controll_reference_ecg foreign key (ecg_id)
      references ecg (ecg_id)
      on update restrict
      on delete restrict;


