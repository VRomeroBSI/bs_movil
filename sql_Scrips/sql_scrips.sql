create table form_bsm ( id serial primary key, id_company INTEGER, nameForm varchar(100), setQuestions jsonb, status INTEGER, tablename varchar );


create or replace PROCEDURE sp_createFormTable()
LANGUAGE plpgsql
as
$$
declare
 r record;
 jsn json;
 queryCreate text; 
 nameTable text;
 nameTableFixed text;
 nameNewTable text;
 valueJson text;
 newColumn text;
 idLastRegisterAdded integer;
idCompanyLastRegisterAdded integer;
begin
	
	select id  into idLastRegisterAdded from form_bsm order by id  desc LIMIT 1;
	select nameform into nametable from form_bsm  where id  = idLastRegisterAdded;
	select id_company into idCompanyLastRegisterAdded from form_bsm  where id  = idLastRegisterAdded;

	select * into nameTableFixed from preparecolumn(nametable);
	select * into nameNewTable from concat_text(nameTableFixed,(idCompanyLastRegisterAdded::varchar) ,(idLastRegisterAdded)::varchar); 
	queryCreate := 'CREATE TABLE '|| nameNewTable || '(id serial PRIMARY KEY, ';
    select setquestions into r from form_bsm  where id  = idLastRegisterAdded;
        for jsn in SELECT value from jsonb_array_elements(r.setquestions)
        loop
			valueJson := jsn->'nombrePregunta';
			select * into newColumn from preparecolumn(valueJson);
			queryCreate:= queryCreate || newColumn || ' varchar ,';     
        end loop;
	  	 queryCreate:= queryCreate || 'latitud float ,longitud float );';
		 raise notice '%', queryCreate;
		 raise notice '%',  nameNewTable;
		
		update form_bsm set tablename = nameNewTable where id = idLastRegisterAdded;
		
		EXECUTE queryCreate;
end;
$$;



create or replace function concat_text(text,text,text) returns text as $$
begin
return $1 ||'_'|| $2 || '_' || $3;
end;
$$ language 'plpgsql';

create or replace function concat_json(text,text,text) returns text as $$
begin
return  $1 || $2 || $3;
end;
$$ language 'plpgsql';

create or replace function prepareColumn(text) returns text
LANGUAGE 'plpgsql'
as 
$$
declare
replaceSpaces text;
toLower text;
simbols text;
BEGIN
	 
	 select * into replaceSpaces from replace($1,' ','_');
	 select * into toLower from lower(replaceSpaces);
	 SELECT * into simbols from regexp_replace(toLower, '[¿"?]', '', 'g');
	 RETURN simbols;
END
$$;

create or replace function callSP_createTable() returns trigger language plpgsql as
  $$
  BEGIN
  CALL sp_createFormTable();
  RETURN NULL;
  end
  $$;
 
CREATE TRIGGER tg_new_form_added 
  -- Este disparador se activa con los eventos de inserción, actualización y borrado
  AFTER INSERT ON form_bsm
  FOR EACH ROW
  execute procedure callSP_createTable ()
  
--drop function callSP_createTable;
--drop trigger tg_new_form_added on form_bsm;

