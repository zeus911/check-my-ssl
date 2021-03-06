import datetime as dt
import socket, ssl

SSL_DATE_FMT = r'%b %d %H:%M:%S %Y %Z'


def connection(hostname, timeout=3.0):
    context = ssl.create_default_context()
    conn = context.wrap_socket(
        socket.socket(socket.AF_INET),
        server_hostname=hostname,
    )
    conn.settimeout(timeout)
    conn.connect((hostname, 443))
    return conn


def ssl_expiry_date(hostname):
    conn = connection(hostname)
    ssl_info = conn.getpeercert()
    return dt.datetime.strptime(ssl_info['notAfter'], SSL_DATE_FMT)


def days_between(date_one, date_two):
    return (date_two - date_one).days


def days_until(a_datetime):
    return days_between(dt.datetime.utcnow(), a_datetime)


def days_until_ssl_expiry(hostname):
    expiry = ssl_expiry_date(hostname)

    return days_until(expiry)
