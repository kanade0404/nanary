from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import Book, Publisher, Author, Series, SeriesBook
from .openbd import OpenBD
import logging
import traceback

logger = logging.getLogger(__name__)


class BookManagementViewSet(viewsets.ViewSet):
    def list(self, request):
        """
        ISBNコードから該当する書籍をOpenBDのAPIから取得
        :param request:
        :return: json形式の書籍データ
        """
        isbn = request.data['isbn']
        data = OpenBD().get_json(isbn)
        return Response(data, status.HTTP_200_OK)

    def create(self, request):
        try:
            publisher = Publisher.objects.create(request['publisher'])
            author = Author.objects.create(request['author'])
            book = Book.objects.create(request)
            if request['series'] != '':
                series = Series.objects.filter(name=request['series']).get()
                if len(series) == 1:
                    series = Series.objects.create(series.id)
                    series_book = SeriesBook.objects.create({'book': book.id, 'series': series.id})
            logger.info('created publisher', publisher)
            logger.info('created author', author)
            logger.info('created book', book)
        except:
            logger.error(traceback.format_exc())
            return Response(None, status.HTTP_400_BAD_REQUEST)
        return Response(None, status.HTTP_201_CREATED)
