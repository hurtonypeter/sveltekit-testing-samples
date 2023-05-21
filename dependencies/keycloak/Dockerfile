FROM quay.io/keycloak/keycloak:21.0.1

ENV KC_DB=postgres

RUN /opt/keycloak/bin/kc.sh build

ARG REALM_JSON=realm.json
COPY $REALM_JSON /tmp/realm.json
COPY --chmod=777 migrate-and-start.sh /opt/keycloak/migrate-and-start.sh

WORKDIR /opt/keycloak
# for demonstration purposes only, please make sure to use proper certificates in production instead
RUN keytool -genkeypair -storepass password -storetype PKCS12 -keyalg RSA -keysize 2048 -dname "CN=server" -alias server -ext "SAN:c=DNS:localhost,IP:127.0.0.1" -keystore conf/server.keystore
# change these values to point to a running postgres instance

ENTRYPOINT ["/opt/keycloak/migrate-and-start.sh"]