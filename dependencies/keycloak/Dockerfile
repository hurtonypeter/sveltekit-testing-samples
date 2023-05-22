FROM quay.io/keycloak/keycloak:21.0.1

ENV KC_DB=postgres

RUN /opt/keycloak/bin/kc.sh build

ARG REALM_JSON=realm.json
COPY $REALM_JSON /tmp/realm.json
COPY --chmod=777 migrate-and-start.sh /opt/keycloak/migrate-and-start.sh

ENTRYPOINT ["/opt/keycloak/migrate-and-start.sh"]